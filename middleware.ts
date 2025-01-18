// middleware.ts
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IJWT } from "./app/lib/definations";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("auth-token");
  const { id } = cookie ? jwtDecode<IJWT>(cookie.value) : "";
  console.log(id);
  const { pathname } = request.nextUrl;
  const userId = pathname.split("u/")[1];
  // Routes that require authentication
  const protectedRoutes = ["/profile", "/edit-profile"];
  // Routes that should not be accessible if logged in
  const authRoutes = [
    "/",
    "/login",
    "/signin",
    "/forgot-password",
    "/reset-password",
  ];

  // Check if the user is logged in
  const isLoggedIn = !!cookie;

  // If the user is logged in and tries to access auth routes, redirect to /profile
  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If the user is not logged in and tries to access protected routes, redirect to /login
  if (!isLoggedIn && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && id === userId) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  // Otherwise, continue with the request
  return NextResponse.next();
}

// Match all routes
export const config = {
  matcher: [
    "/",
    "/login",
    "/signin",
    "/profile",
    "/u/:userId*",
    "/edit-profile",
    "/forgot-password",
    "/reset-password",
  ],
};
