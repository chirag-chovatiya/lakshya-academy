import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("t")?.value; 
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = jwt.decode(token);

  if (decoded.user_type === "Student" && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (decoded.user_type === "Teacher" && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/admin/:path*"], 
};
