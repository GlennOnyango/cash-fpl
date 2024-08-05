import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("accessToken")?.value;
  const authTime = request.cookies.get("authTime")?.value;

  if (authTime && Number(authTime) <= new Date().getTime()) {
    request.cookies.clear();
    return Response.redirect(new URL("/sign-in", request.url));
  }

  const restrictedPaths = ["/leagues", "/dashboard"];

  if (currentUser && !restrictedPaths.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && restrictedPaths.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/", "/leagues", "/dashboard", "/sign-in", "/sign-up"],
};
