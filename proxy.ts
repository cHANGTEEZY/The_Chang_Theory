import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Define route types
  const publicRoutes = ["/"];
  const authRoutes = ["/signin", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // If user is logged in and trying to access auth pages (signin/signup)
  // Redirect them to the home page
  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT logged in and trying to access a protected route
  // (not public and not auth routes), redirect to signin
  if (!sessionCookie && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except static files, api routes, and _next
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
