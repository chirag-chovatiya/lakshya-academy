import { NextResponse } from "next/server";
import { connectDb } from "@/config/database";
import sendResponse from "@/utils/response";
import bcrypt from "bcrypt";
import {
  deleteUserById,
  getUserByIdWithReports,
  updateUserById,
} from "@/models/users/userModel";
connectDb();

export async function GET(request, { params }) {
  try {
    const { teacherId } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1; 
    const pageSize = parseInt(url.searchParams.get("pageSize")) || 10; 
    const month = parseInt(url.searchParams.get("month"));
    const year = parseInt(url.searchParams.get("year"));
    const hwStatus = url.searchParams.get("hwStatus");

    let userResult;

    if (teacherId) {
      userResult = await getUserByIdWithReports(teacherId, page, pageSize, month, year, hwStatus);
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
      userResult.password = null;
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
      user_type:newData.user_type,
      images:newData.images,
      status: newData.status,
    };

    if (newData.password) {
      const hashedPassword = await bcrypt.hash(newData.password, 10);
      userData.password = hashedPassword;
    }
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
