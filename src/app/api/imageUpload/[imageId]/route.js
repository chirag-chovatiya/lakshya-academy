import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import { deleteImageById, getImageById } from "@/models/homeWorkImg/imageModel";

export async function GET(request, { params }) {
  try {
    const { imageId } = params;
    const imageResult = await getImageById(imageId);
    if (imageResult) {
      return sendResponse(NextResponse, 200, "Image are available", imageResult);
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Image found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
export async function DELETE(request, { params }) {
  try {
    const { imageId } = params;
    const deleteImage = await deleteImageById(imageId);
    if (deleteImage) {
      return sendResponse(NextResponse, 200, "Image Deleted successfully");
    } else {
      return sendResponse(
        NextResponse,
        404,
        "No Image found with the provided ID"
      );
    }
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}
