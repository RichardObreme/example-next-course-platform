import { notFound } from "next/navigation";
import { getCurrentUser } from "./features/users/db/users";
import { NextRequest, NextResponse } from "next/server";

type RouteMatcher = (url: string) => boolean;

function createRouteMatcher(prefixes: string[]): RouteMatcher {
  return (url: string) => prefixes.some((prefix) => url.startsWith(prefix));
}

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/api(.*)",
  "/courses/:courseId/lessons/:lessonId",
  "/products(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {
  if (isAdminRoute(req.nextUrl.pathname)) {
    const user = await getCurrentUser();
    console.log("isAdminRoute");

    if (user.role !== "admin")
      return NextResponse.rewrite(new URL("/404", req.nextUrl.basePath));
  }

  if (!isPublicRoute(req.nextUrl.pathname)) {
    // TODO
  }
  console.log("MIDDLEWARE");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
