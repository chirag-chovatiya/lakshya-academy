import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import { authenticateToken } from "@/middlewares/auth";
import { createAdminAds, getAllAdminAds } from "@/models/adminAdv/adminAdvModel";

export async function POST(request) {
  const authResponse = await authenticateToken(request);
  if (!authResponse.user) {
    return sendResponse(
      NextResponse,
      authResponse.status || 401,
      authResponse.message || "Unauthorized"
    );
  }

  if (authResponse.user.user_type !== "Admin") {
    return sendResponse(NextResponse, 403, "Forbidden: Only admin can create");
  }

  try {
    const data = await request.json();
    const newAdv = await createAdminAds(data);
    return sendResponse(
      NextResponse,
      201,
      "Advertisement created successfully",
      newAdv
    );
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}

export async function GET(request) {
  const authResponse = await authenticateToken(request);
  if (!authResponse.user) {
    return sendResponse(
      NextResponse,
      authResponse.status || 401,
      authResponse.message || "Unauthorized"
    );
  }
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page")) ?? 1;
    const pageSize =
      parseInt(request.nextUrl.searchParams.get("pageSize")) ?? 10;

    const allAdv = await getAllAdminAds(page, pageSize);

    if (allAdv) {
      return sendResponse(
        NextResponse,
        200,
        "All Advertisement are available",
        allAdv
      );
    } else {
      return sendResponse(NextResponse, 404, "No Advertisement available");
    }
  } catch (error) {
    console.log(error);
    return sendResponse(NextResponse, 500, "Internal server error", {
      error: error.message,
    });
  }
}
