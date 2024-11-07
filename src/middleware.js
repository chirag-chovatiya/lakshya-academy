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
    const isPathStartWithAI = req.nextUrl.pathname.startsWith("/admin");
    if (isPathStartWithAI && !token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.rewrite(loginUrl);
    }
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/login","/admin"],
};

