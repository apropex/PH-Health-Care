import { parse } from "cookie";
import { cookies } from "next/headers";

// === Constants ===
const CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  path: "/",
  // domain: process.env.COOKIE_DOMAIN, // e.g., .example.com
  maxAge: 1000 * 60 * 60 * 24 * 3,
};

const threeDays = 1000 * 60 * 60 * 24 * 3;
const thirtyDays = 1000 * 60 * 60 * 24 * 30;

export const setCookies = async (response: Response, refresh = true) => {
  const setCookieHeaders = response.headers.getSetCookie();
  if (!setCookieHeaders || setCookieHeaders.length === 0) {
    return {
      success: false,
      message: "Authentication failed: No cookies received",
      user: null,
    };
  }

  const cookieStore = await cookies();
  let accessTokenSet = false;
  let refreshTokenSet = false;
  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  for (const header of setCookieHeaders) {
    const parsed = parse(header);

    if (parsed.accessToken) {
      CookieOptions.maxAge = parseInt(parsed["Max-Age"] || `${threeDays}`);
      cookieStore.set("accessToken", parsed.accessToken, CookieOptions);
      accessTokenSet = true;
      accessToken = parsed.accessToken;
    }

    if (parsed.refreshToken) {
      CookieOptions.maxAge = parseInt(parsed["Max-Age"] || `${thirtyDays}`);
      cookieStore.set("refreshToken", parsed.refreshToken, CookieOptions);
      refreshTokenSet = true;
      refreshToken = parsed.refreshToken;
    }
  }

  if (!refresh) refreshTokenSet = true;

  if (!accessTokenSet || !refreshTokenSet) {
    return {
      success: false,
      message: "Authentication failed: Missing access or refresh token",
      user: null,
    };
  }

  return { success: true, accessToken, refreshToken };
};
