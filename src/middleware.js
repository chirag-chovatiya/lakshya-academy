// import { NextResponse } from "next/server";

// export default function middleware(req) {
//   const sessionToken = req.cookies.get("next-auth.session-token");

//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin"],
// };

import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    const isAdminPath = req.nextUrl.pathname.startsWith("/admin");
    const isHomePath = req.nextUrl.pathname.startsWith("/home");

    if ((isAdminPath || isHomePath) && !token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token) {
      if (isAdminPath && !["Admin", "Teacher"].includes(token.userType)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (isHomePath && token.userType !== "Student") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin", "/", "/login"], 
};


