// middlewares/auth.js
import jwt from "jsonwebtoken";
import { getUserById } from "@/models/users/userModel";
import { NextResponse } from "next/server";

const sendResponse = (func, statusCode, message, data) => {
  let obj;
  if (data) {
    obj = {
      code: statusCode,
      message: message,
      data: data,
    };
  } else {
    obj = {
      code: statusCode,
      message: message,
    };
  }
  return func.json({ data, ...obj });
};
// export const authenticateToken = async (req, next) => {
//   const authHeader = req.headers.get("authorization");
//   let token;
//   if (typeof authHeader === "string" && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//   } else {
//     token = authHeader;
//   }
//   if (!token) {
//     return sendResponse(NextResponse, 401, "Unauthorized");
//   }
//   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//     if (err) {
//       return sendResponse(NextResponse, 401, "Unauthorized");
//     }
//     req.userId = decoded.id;
//     const user = await getUserById(req.userId);
//     if (user) {
//       req.user = user;
//       return next();
//     } else {
//       return sendResponse(NextResponse, 404, "User Token not found");
//     }
//   });
// };
export const authenticateAdminToken = async (req, next) => {
  const authHeader = req.headers.get("authorization");

  let token;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else {
    token = authHeader;
  }
  if (!token) {
    return sendResponse(NextResponse, 401, "Unauthorized");
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return sendResponse(NextResponse, 401, "Unauthorized");
    }
    req.userId = decoded.id;

    const user = await getUserById(req.userId);
    if (user && user.type === "Admin") {
      req.user = user;
      return NextResponse.next();
    } else {
      return sendResponse(NextResponse, 403, "User is not an admin");
    }
  });
};
