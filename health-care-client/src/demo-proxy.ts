import { tUserRole, UserRole } from "@/constants";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { iUser } from "./interfaces/user.interfaces";
import { redirectToLogin } from "./proxy-utils/cookie-utils";
import { handleRefreshToken } from "./proxy-utils/refresh-token";

const auth_routes = ["/login", "/register"];
const unauthorized_route = "/unauthorized";

// Role-based route mapping
const ROLE_ROUTES = {
  ADMIN: [/^\/admin(\/|$)/],
  DOCTOR: [/^\/doctor(\/|$)/],
  PATIENT: [/^\/patient(\/|$)/],
} as const;

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl?.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  let user: iUser | null = null;

  // 1. Allow public routes (login, register)
  if (auth_routes.includes(pathname)) {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else return NextResponse.next();
  }

  // 2. No tokens at all → redirect to login
  if (!accessToken && !refreshToken) {
    return redirectToLogin(pathname, request.url);
  }

  // 3. Decode access token
  if (accessToken) {
    try {
      user = jwtDecode<iUser>(accessToken);
    } catch {
      // Invalid access token → try refresh
      user = null;
    }
  }

  // 4. Try refresh token if access token missing/invalid
  if (!user && refreshToken) {
    const result = await handleRefreshToken(request, refreshToken, pathname);

    // Refresh failed → redirect to login
    if (result instanceof NextResponse) {
      return result;
    }

    // Refresh succeeded → get user and response
    if ("response" in result && result.user) {
      user = result.user;
      return result.response; // Express already set cookies
    }
  }

  // 5. Final check: no user → logout
  if (!user) {
    const response = redirectToLogin(pathname, request.url);
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // 6. Role-based route protection
  const role = user.role as tUserRole;

  if (!role || !ROLE_ROUTES[role]) {
    return NextResponse.redirect(new URL(unauthorized_route, request.url));
  }

  if (pathname === "/dashboard") {
    switch (role) {
      case UserRole.ADMIN:
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));

      case UserRole.DOCTOR:
        return NextResponse.redirect(new URL("/dashboard/doctor", request.url));

      case UserRole.PATIENT:
        return NextResponse.redirect(new URL("/dashboard/patient", request.url));

      default:
        return NextResponse.redirect(new URL(unauthorized_route, request.url));
    }
  }

  const isAllowed = ROLE_ROUTES[role].some((regex) => regex.test(pathname));
  if (!isAllowed) {
    return NextResponse.redirect(new URL(unauthorized_route, request.url));
  }

  // All good → proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
