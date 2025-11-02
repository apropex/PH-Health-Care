// middleware/utils/cookie-utils.ts
import { NextResponse } from "next/server";

export function forwardSetCookies(response: NextResponse, setCookieHeaders: string[]) {
  setCookieHeaders.forEach((cookie) => {
    response.headers.append("set-cookie", cookie);
  });
  return response;
}

export function redirectToLogin(pathname: string, baseUrl: string) {
  const url = new URL("/login", baseUrl);
  url.searchParams.set("dest", encodeURIComponent(pathname));
  return NextResponse.redirect(url);
}
