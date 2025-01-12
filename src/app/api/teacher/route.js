import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  createUser,
  getAllTeacherUser,
  getAllUser,
  getUserByEmail,
} from "@/models/users/userModel";
import dotenv from "dotenv";
import sendResponse from "@/utils/response";
import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";
dotenv.config();

export async function POST(req, res) {
 
  try {
    const {
      email,
      password,
      name,
      phone_number,
      user_type,
      level,
      images,
      status,
      teacher_id
    } = await req.json();

    if (!email || !password) {
      return sendResponse(NextResponse, 400, "Email and password are required");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return sendResponse(
        NextResponse,
        500,
        "Server misconfiguration: JWT secret not found"
      );
    }

    let user = await getUserByEmail(email);

    if (user) {
      if (!user.status) {
        return sendResponse(NextResponse, 403, "Your account is inactive");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return sendResponse(NextResponse, 400, "Invalid password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          user_type: user.user_type,
          level: user.level,
        },
        jwtSecret || "a1sdf25rfdd5g863892fdg25ttf",
        { expiresIn: "7d" }
      );
      setCookie("tkn", token, { expire: new Date() + 9999 });

      return sendResponse(NextResponse, 200, "User logged in successfully", {
        token,
        user,
      });
    } else {
      if (!name || !phone_number) {
        return sendResponse(
          NextResponse,
          400,
          "Name and phone number are required for registration"
        );
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = {
        teacher_id,
        name,
        email,
        phone_number,
        password: hashPassword,
        user_type,
        level,
        images,
        status,
      };

      user = await createUser(newUser);
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: "7d",
      });
      setCookie("tkn", token, { expire: new Date() + 9999 });

      return sendResponse(
        NextResponse,
        200,
        "User registered and logged in successfully",
        { token, user }
      );
    }
  } catch (error) {
    console.error("Error during registration/login:", error);
    return sendResponse(NextResponse, 500, "Internal server error", {
      error: error.message,
    });
  }
}
export async function GET(request) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page")) ?? 1;
    const pageSize =
      parseInt(request.nextUrl.searchParams.get("pageSize")) ?? 10;
    const searchQuery = request.nextUrl.searchParams.get("searchQuery");
    const teacher_id = request.nextUrl.searchParams.get("teacher_id");

    const allUser = await getAllTeacherUser(page, pageSize, searchQuery, teacher_id);
    if (allUser) {
      return sendResponse(NextResponse, 200, "All Teacher User are available", allUser);
    } else {
      return sendResponse(NextResponse, 404, "No Teacher User available");
    }
  } catch (error) {
    return sendResponse(NextResponse, 500, "Internal server error", {
      error: error.message,
    });
  }
}
