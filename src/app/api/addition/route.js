import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import { createTest, getAllTest } from "@/models/addition/studentAdditionModel";

export async function POST(request) {
  try {
    const data = await request.json();
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

export async function GET(request) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page")) ?? 1;
    const pageSize =
      parseInt(request.nextUrl.searchParams.get("pageSize")) ?? 10;
    const allTest = await getAllTest(page, pageSize);
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
