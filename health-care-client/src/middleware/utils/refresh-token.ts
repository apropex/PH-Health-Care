// middleware/utils/refresh-token.ts
import { iUser } from "@/interfaces/user.interfaces";
import mergeApi from "@/utility/merge-api";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { forwardSetCookies } from "./cookie-utils";

export async function handleRefreshToken(
  request: NextRequest,
  refreshToken: string,
  pathname: string
): Promise<NextResponse | { response: NextResponse; user: iUser }> {
  try {
    const res = await fetch(mergeApi("/auth/refresh-token-verifier"), {
      method: "GET",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Refresh failed");

    const setCookieHeaders = res.headers.getSetCookie();
    if (!setCookieHeaders?.length) throw new Error("No Set-Cookie");

    // Extract accessToken
    const accessCookie = setCookieHeaders.find((c) => c.includes("accessToken="));
    if (!accessCookie) throw new Error("accessToken missing");

    const newAccessToken = accessCookie.split("accessToken=")[1].split(";")[0];
    const user = jwtDecode<iUser>(newAccessToken);

    // Forward ALL Set-Cookie headers (accessToken only from Express)
    const response = NextResponse.next();
    forwardSetCookies(response, setCookieHeaders);

    return { response, user };
  } catch {
    const response = NextResponse.redirect(
      new URL(`/login?dest=${encodeURIComponent(pathname)}`, request.url)
    );
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}
