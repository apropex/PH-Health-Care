/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt, { JwtPayload } from "jsonwebtoken";
import { deleteCookie } from "./cookie";

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const checkToken = async (
  token: string,
  secret: "access" | "refresh",
): Promise<JwtPayload | null> => {
  if (!accessTokenSecret || !refreshTokenSecret) return null;

  const tokenSecret = secret === "access" ? accessTokenSecret : refreshTokenSecret;

  try {
    const decoded = jwt.verify(token, tokenSecret);
    if (typeof decoded === "string") return null;
    return decoded as JwtPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      await deleteCookie("accessToken");
      if (secret === "refresh") await deleteCookie("refreshToken");
    }
    return null;
  }
};
