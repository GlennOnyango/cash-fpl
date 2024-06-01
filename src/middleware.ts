import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("role")?.value;
  console.log("current", currentUser);

  if (currentUser === "2" && !request.nextUrl.pathname.startsWith("/manager")) {
    return Response.redirect(new URL("/manager", request.url));
  }

  if (currentUser === "1" && !request.nextUrl.pathname.startsWith("/player")) {
    return Response.redirect(new URL("/player", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/sign-in")) {
    return Response.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/manager", "/player"],
};
