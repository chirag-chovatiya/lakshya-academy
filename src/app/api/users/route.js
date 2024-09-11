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
    const { email, password, name, type, phone_number, images } =
      await req.json();
    let user = await getUserByEmail(email);

    if (email && password && name && type && phone_number && images) {
      if (user) {
        return sendResponse(NextResponse, 400, "User already exists");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        phone_number,
        password: hashPassword,
        type,
        images,
        status: "Active",
      };
      user = await createUser(newUser);

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      setCookie("tkn", token, { expire: new Date() + 9999 });
      return sendResponse(NextResponse, 200, "User registered successfully", {
        token,
        user,
      });
    } else {
      if (!user) {
        return sendResponse(
          NextResponse,
          401,
          "User not found. Please register first."
        );
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        setCookie("tkn", token, { expire: new Date() + 9999 });
        return sendResponse(NextResponse, 200, "Login successful", {
          token,
          user,
        });
      } else {
        return sendResponse(NextResponse, 401, "Invalid password");
      }
    }
  } catch (error) {
    console.error("Error during user registration/login:", error);
    return sendResponse(NextResponse, 500, "Internal server error", {
      error: error.message,
    });
  }
}

export async function GET (request) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get("page")) ?? 1;
    const pageSize =
    parseInt(request.nextUrl.searchParams.get("pageSize")) ?? 10;
    const allUser = await getAllUser(page,
      pageSize,)
      console.log(allUser)
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
