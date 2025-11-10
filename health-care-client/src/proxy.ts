import { NextRequest, NextResponse } from "next/server";
import { tUserRole } from "./constants";
import { checkToken } from "./proxy-utils/check-token";
import { deleteCookie, getCookie } from "./proxy-utils/cookie";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./proxy-utils/proxy-helper";
import { setAccessTokenByRefreshToken } from "./proxy-utils/refresh-token";

export default async function proxy(request: NextRequest) {
  const redirect = (url: string) => NextResponse.redirect(new URL(url, request.url));
  const pathname = request.nextUrl.pathname;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);

  const accessToken = (await getCookie("accessToken")) || null;
  const refreshToken = (await getCookie("refreshToken")) || null;

  let userRole: tUserRole | null = null;

  // 1. Check access token
  if (accessToken) {
    const decoded = await checkToken(accessToken, "access");
    if (decoded?.role) {
      userRole = decoded.role as tUserRole;
    } else {
      await deleteCookie("accessToken");
    }
  }

  // 2. If no valid access token, try refresh token
  if (!userRole && refreshToken) {
    const role = await setAccessTokenByRefreshToken(refreshToken);
    if (role) {
      userRole = role;
    } else {
      return redirect(loginUrl.toString());
    }
  }

  if (isAuthRoute(pathname) && userRole) {
    return redirect(getDefaultDashboardRoute(userRole));
  }

  const routeOwner = getRouteOwner(pathname);

  if (routeOwner === null) return NextResponse.next();

  if (!userRole) return redirect(loginUrl.toString());

  if (routeOwner === "COMMON") return NextResponse.next();

  if (routeOwner === "ADMIN" || routeOwner === "DOCTOR" || routeOwner === "PATIENT") {
    if (userRole !== routeOwner) {
      return redirect(getDefaultDashboardRoute(userRole));
    }
    return NextResponse.next();
  }

  return redirect(loginUrl.toString());
}

//
export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};

//
