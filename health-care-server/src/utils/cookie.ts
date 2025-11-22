import { Response } from "express";
import _env, { isProd } from "../config";
import { getDuration } from "./time_unit";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "none" as const,
};

export const setCookie = {
  accessToken(res: Response, token: string, maxAge?: number) {
    res.cookie("accessToken", token, {
      ...cookieOptions,
      maxAge: maxAge ?? getDuration(_env.jwt.access_token_expire_time),
    });
  },

  refreshToken(res: Response, token: string, maxAge?: number) {
    res.cookie("refreshToken", token, {
      ...cookieOptions,
      maxAge: maxAge ?? getDuration(_env.jwt.refresh_token_expire_time),
    });
  },

  allTokens(res: Response, accessToken: string, refreshToken: string) {
    this.accessToken(res, accessToken);
    this.refreshToken(res, refreshToken);
  },

  clearCookies(res: Response) {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
  },
};
