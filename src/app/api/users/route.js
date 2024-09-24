import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, getAllUser, getUserByEmail} from "@/models/users/userModel";
import dotenv from "dotenv";
import sendResponse from "@/utils/response";
import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";
dotenv.config();

export async function POST(req, res) {
  try {
    const { email, password, name, phone_number, level , images } = await req.json();

    if (!email || !password) {
      return sendResponse(NextResponse, 400, "Email and password are required");
    }

    let user = await getUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return sendResponse(NextResponse, 400, "Invalid password");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      setCookie("tkn", token, { expire: new Date() + 9999 });

      return sendResponse(NextResponse, 200, "User logged in successfully", { token, user });
    } else {
      if (!name || !phone_number) {
        return sendResponse(NextResponse, 400, "Name and phone number are required for registration");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        phone_number,
        password: hashPassword,
        type: "Student", 
        level,
        images,
        status: "Active", 
      };

      user = await createUser(newUser);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      setCookie("tkn", token, { expire: new Date() + 9999 });

      return sendResponse(NextResponse, 200, "User registered and logged in successfully", { token, user });
    }
  } catch (error) {
    console.error("Error during registration/login:", error);
    return sendResponse(NextResponse, 500, "Internal server error", { error: error.message });
  }
}
export async function GET (request) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page")) ?? 1;
    const pageSize =
    parseInt(request.nextUrl.searchParams.get("pageSize")) ?? 10;
    const allUser = await getAllUser(page,
      pageSize,)
    if (allUser) {
      return sendResponse(NextResponse, 200, 'All User are available', allUser)
    } else {
      return sendResponse(NextResponse, 404, 'No User available')
    }
  } catch (error) {
    return sendResponse(NextResponse, 500, 'Internal server error', {
      error: error.message
    })
  }
}
