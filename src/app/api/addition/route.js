import { NextResponse } from "next/server";
import sendResponse from "@/utils/response";
import { createAddition } from "@/models/addition/studentAdditionModel";

export async function POST(request) {
  try {
    const data = await request.json();
    
    const newAddition = await createAddition(data);

    return sendResponse(
      NextResponse,
      201,
      "Addition created successfully",
      newAddition
    );
  } catch (error) {
    console.error(error);
    return sendResponse(NextResponse, 500, "Internal server error");
  }
}

// export async function GET () {
//   try {
//     const allBanner = await getAllBanner()
//     if (allBanner.length > 0) {
//       return sendResponse(NextResponse, 200, 'All Banner are available', allBanner)
//     } else {
//       return sendResponse(NextResponse, 404, 'No Banner available')
//     }
//   } catch (error) {
//     return sendResponse(NextResponse, 500, 'Internal server error', {
//       error: error.message
//     })
//   }
// }


