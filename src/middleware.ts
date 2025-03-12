import { publicRoutes } from "@/data/auth.data";
import { getToken } from "@/libs/auth.libs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = await getToken();

  // console.log("TOKEN: ", token)

  // for private routes
  if (!publicRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  // for public routes
  else if (token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  // specify the route you want to protect
  matcher: [
    "/",
    "/posts/:path*",
    "/messages",
    "/notifications",
    "/messages/:path*",
    "/bookmarks",
    "/notifications",
    "/settings",
    "/createPost",
    "/login",
    "/register",
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
