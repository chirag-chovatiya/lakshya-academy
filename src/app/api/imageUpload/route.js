import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { createImage, getAllImage } from "@/models/homeWorkImg/imageModel";
import sendResponse from "@/utils/response";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
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

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replace(/\\/g, "/").replace("/", "");

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "lakshyAcadamy",
            resource_type: "image",
            public_id: filename,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      const fileUrl = result.secure_url;
      uploadedFileUrls.push(fileUrl);

      // Save to database
      await createImage({ studentId, studentLevel, imgUrl: fileUrl });
    }

    const responseUrls =
      uploadedFileUrls.length === 1 ? uploadedFileUrls[0] : uploadedFileUrls;

    return sendResponse(NextResponse, 200, "Images Uploaded Successfully", {
      urls: responseUrls,
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    console.log(error);
    return sendResponse(NextResponse, 500, "Image Upload Failed");
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
