import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import {
  createTest,
  getAllAddition,
} from "@/models/addition/studentAdditionModel";

export async function POST(request) {
  try {
    const data = await request.json();

    if (data.subDigits < 1 || data.subDigits > 9) {
      return sendResponse(
        NextResponse,
        500,
        "subDigits must be between 1 and 9."
      );
    }

    const newAddition = await createTest(data);

    return sendResponse(
      NextResponse,
      201,
      "Test created successfully",
      newAddition
    );
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}

export async function GET() {
  try {
    const allTest = await getAllAddition();
    if (allTest) {
      return sendResponse(NextResponse, 200, "All Test are available", allTest);
    } else {
      return sendResponse(NextResponse, 404, "No Test available");
    }
  } catch (error) {
    return sendResponse(NextResponse, 500, "Internal server error", {
      error: error.message,
    });
  }
}
