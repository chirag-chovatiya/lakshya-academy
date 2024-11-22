import { NextResponse } from "next/server";
import { getUserDetailsFromToken } from "./utils/getUserTypeFromToken";

export function middleware(req) {
  const token = req.cookies.get("t");

  const protectedRoutes = ["/admin", "/"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  let user_type;
  if (token) {
    try {
      const userDetails = getUserDetailsFromToken(token);
      user_type = userDetails?.user_type;
    } catch (error) {
      console.error("Error getting user details from token:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");
  const isHomePath = req.nextUrl.pathname === "/";

  if (user_type) {
    if (isAdminPath && !["Admin", "Teacher"].includes(user_type)) {
      return NextResponse.redirect(new URL("/", req.url)); 
    }
    if (isHomePath && user_type !== "Student") {
      return NextResponse.redirect(new URL("/admin", req.url)); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/:path*"], 
};
