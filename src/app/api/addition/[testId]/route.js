import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import {
  deleteTestById,
  getTestById,
  updateTestById,
} from "@/models/addition/studentAdditionModel";

export async function GET(request, { params }) {
  try {
    const { testId } = params;
    const testResult = await getTestById(testId);
    if (testResult) {
      return sendResponse(NextResponse, 200, "Test are available", testResult);
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Test found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
export async function POST(request, { params }) {
  try {
    const { testId } = params;
    const newdata = await request.json();

    if (newdata.subDigits < 1 || newdata.subDigits > 9) {
      return sendResponse(
        NextResponse,
        500,
        "subDigits must be between 1 and 9."
      );
    }

    const testResult = await updateTestById(testId, newdata);
    if (testResult) {
      return sendResponse(
        NextResponse,
        200,
        "Test Updated Successfull",
        newdata
      );
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Test found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
export async function DELETE(request, { params }) {
  try {
    const { testId } = params;
    const deleteTest = await deleteTestById(testId);
    if (deleteTest) {
      return sendResponse(NextResponse, 200, "Test Deleted successfully");
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Test found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}