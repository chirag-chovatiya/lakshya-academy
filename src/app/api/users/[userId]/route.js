import { NextResponse } from "next/server";
import { connectDb } from "@/config/database";
import sendResponse from "@/utils/response";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "@/models/users/userModel";
import { authenticateAdminToken } from "@/middlewares/auth";
connectDb();

export async function GET(request, { params }) {
  // const authResponse = await authenticateAdminToken(request);
  // if (authResponse) {
  //   return authResponse;
  // }

  try {
    const { userId } = params;
    let userResult;

    if (userId) {
      userResult = await getUserById(userId);
    } else if (request.user) {
      request.user.password = null;
      request.user.otp = null;
      return sendResponse(
        NextResponse,
        200,
        "User details fetched successfully",
        request.user
      );
    }

    if (userResult) {
      return sendResponse(NextResponse, 200, "User is available", userResult);
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No User found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
export async function POST(request, { params }) {
  try {
    const { userId } = params;
    const newData = await request.json();

    const userData = {
      name: newData.name,
      phone_number: newData.phone_number,
      level:newData.level,
      type:newData.type,
      images:newData.images,
      status: newData.status,
    };

    const userResult = await updateUserById(userId, userData);

    if (userResult) {
      return sendResponse(
        NextResponse,
        200,
        "User Updated Successfull",
        newData
      );
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No User found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
export async function DELETE(request, { params }) {
  try {
    const { userId } = params;
    const deleteUser = await deleteUserById(userId);
    if (!deleteUser) {
      return sendResponse(
        NextResponse,
        404,
        "No User found with the provided ID"
      );
    } else {
      return sendResponse(NextResponse, 200, "User Deleted successfully");
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
