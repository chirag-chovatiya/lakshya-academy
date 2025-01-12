import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import { authenticateToken } from "@/middlewares/auth";
import { getAdminAdsById, updateAdminAdsById } from "@/models/adminAdv/adminAdvModel";

export async function GET(request, { params }) {
  try {
    const { advId } = params;
    const advResult = await getAdminAdsById(advId);
    if (advResult) {
      return sendResponse(
        NextResponse,
        200,
        "Advertisement are available",
        advResult
      );
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Advertisement found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}

export async function POST(request, { params }) {
  const authResponse = await authenticateToken(request);
  if (!authResponse.user) {
    return sendResponse(
      NextResponse,
      authResponse.status || 401,
      authResponse.message || "Unauthorized"
    );
  }

  if (authResponse.user.user_type !== "Admin") {
    return sendResponse(
      NextResponse,
      403,
      "Forbidden: Only admin can update advertisement"
    );
  }
  try {
    const { advId } = params;
    const newData = await request.json();

    const userData = {
      description: newData.description,
      status: newData.status,
    };
    const userResult = await updateAdminAdsById(
      advId,
      userData
    );
    if (userResult) {
      return sendResponse(
        NextResponse,
        200,
        "Advertisement Updated Successfull",
        newData
      );
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Advertisement found with the provided ID"
      );
    }
  } catch (error) {
    console.log(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}

