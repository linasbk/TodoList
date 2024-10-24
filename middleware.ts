// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (token && pathname === "/signIn" || token && pathname === "/signUp") {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (token || pathname.startsWith("/signIn") || pathname.startsWith("/signUp") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/signIn", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/", 
    "/signIn",
    "/signUp", 
  ],
};