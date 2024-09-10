import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import { deleteReportById, getReportById, updateReportById } from "@/models/studentReport/studentReportModel";

export async function GET(request, { params }) {
  try {
    const { reportId } = params;
    const reportResult = await getReportById(reportId);
    if (reportResult) {
      return sendResponse(NextResponse, 200, "Report are available", reportResult);
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Report found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
export async function POST(request, { params }) {
  try {
    const { reportId } = params;
    const newdata = await request.json();

    const testResult = await updateReportById(reportId, newdata);
    if (testResult) {
      return sendResponse(
        NextResponse,
        200,
        "Report Updated Successfull",
        newdata
      );
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Report found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
export async function DELETE(request, { params }) {
  try {
    const { reportId } = params;
    const deleteReport = await deleteReportById(reportId);
    if (deleteReport) {
      return sendResponse(NextResponse, 200, "Report Deleted successfully");
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Report found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
