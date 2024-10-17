import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import {
  createReport,
  getAllReport,
} from "@/models/studentReport/studentReportModel";

export async function POST(request) {
  try {
    const data = await request.json();
    const newAddition = await createReport(data);

    return sendResponse(
      NextResponse,
      201,
      "Student Report created successfully",
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
    const hwStatus = request.nextUrl.searchParams.get("hwStatus");
    const level = request.nextUrl.searchParams.get("level");
    const createdAt = request.nextUrl.searchParams.get("createdAt");
    const studentName = request.nextUrl.searchParams.get("studentName");

    const allReport = await getAllReport(page, pageSize, hwStatus, level, createdAt, studentName);
    if (allReport) {
      return sendResponse(
        NextResponse,
        200,
        "All Report are available",
        allReport
      );
    } else {
      return sendResponse(NextResponse, 404, "No Report available");
    }
  } catch (error) {
    console.log(error);
    return sendResponse(NextResponse, 500, "Internal server error", {
      error: error.message,
    });
  }
}
