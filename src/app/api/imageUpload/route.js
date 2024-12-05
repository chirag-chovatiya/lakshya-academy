import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IMG_BASE_URl } from "@/service/constant/api-constant";
import { createImage, getAllImage } from "@/models/homeWorkImg/imageModel";
import sendResponse from "@/utils/response";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const folderName = formData.get("folderName");
    const studentId = formData.get("studentId");
    const studentLevel = formData.get("studentLevel");

    if (!files.length) {
      return sendResponse(NextResponse, 400, "No files received.");
    }

    if (!studentId) {
      return sendResponse(NextResponse, 400, "Student ID is required.");
    }
    if (!studentLevel) {
      return sendResponse(NextResponse, 400, "Student Level is required.");
    }

    const uploadedFileUrls = [];

    const publicDir = path.join(process.cwd(), "public", "lakshyAcadamy");

    if (!fs.existsSync(publicDir)) {
      await fs.promises.mkdir(publicDir, { recursive: true });
    }

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\\/g, "/").replace("/", "");

      const filePath = path.join(publicDir, filename);

      await fs.promises.writeFile(filePath, buffer);

      const fileUrl = `${IMG_BASE_URl}/lakshyAcadamy/${filename}`;
      uploadedFileUrls.push(fileUrl);

      await createImage({ studentId, studentLevel, imgUrl: fileUrl });
    }

    const responseUrls =
      uploadedFileUrls.length === 1 ? uploadedFileUrls[0] : uploadedFileUrls;

    return sendResponse(NextResponse, 200, "Images Uploaded Successfully", {
      urls: responseUrls,
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    return sendResponse(NextResponse, 500, "Images Uploaded Failed");
  }
};

export async function GET(request) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page")) ?? 1;
    const pageSize =
      parseInt(request.nextUrl.searchParams.get("pageSize")) ?? 10;
    const level = request.nextUrl.searchParams.get("level");
    const createdAt = request.nextUrl.searchParams.get("createdAt");
    const studentName = request.nextUrl.searchParams.get("studentName");

    const allReport = await getAllImage(
      page,
      pageSize,
      level,
      createdAt,
      studentName
    );

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
