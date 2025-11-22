import { UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../error-handler/ApiError";
import { setCookie } from "../../../utils/cookie";
import {
  generateAccessToken,
  UserTokenPayload,
  verifyRefreshToken,
} from "../../../utils/jwt";
import sCode from "../../../utils/statusCode";
import catchAsync from "../../shared/catchAsync";
import { prisma } from "../../shared/prisma";
import _response from "../../shared/sendResponse";
import services from "./auth.service";

const login = catchAsync(async (req, res) => {
  const { user, access_token, refresh_token } = await services.login(req.body);
  setCookie.allTokens(res, access_token, refresh_token);
  _response(res, { message: "User logged in successfully", data: user });
});

const resetPassword = catchAsync(async (req, res) => {
  await services.resetPassword(req.decoded?.id ?? "", req.body);
  _response(res, {
    message: "Password reset successfully!",
  });
});

const getAccessTokenByRefreshToken = catchAsync(async (req, res) => {
  const existingRefreshToken = req.cookies.refreshToken;

  // 1. Refresh Token missing?
  if (!existingRefreshToken) {
    setCookie.clearCookies(res);
    throw new ApiError(sCode.UNAUTHORIZED, "Refresh token is missing");
  }

  let decoded: UserTokenPayload;

  try {
    decoded = verifyRefreshToken(existingRefreshToken) as UserTokenPayload;
  } catch (err) {
    setCookie.clearCookies(res);
    throw new ApiError(sCode.UNAUTHORIZED, "Invalid or expired refresh token");
  }

  const userId = decoded.id;

  // 2. Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
    },
  });

  if (!user) {
    setCookie.clearCookies(res);
    throw new ApiError(sCode.UNAUTHORIZED, "User not found");
  }
  if (user.status === UserStatus.DELETED)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User account was deleted, contact to support",
    );

  const newAccessToken = generateAccessToken(decoded);
  // const newRefreshToken = generateRefreshToken(decoded);
  // setCookie.allTokens(res, newAccessToken, newRefreshToken);

  setCookie.accessToken(res, newAccessToken);

  _response(res, { message: "Token refreshed successfully!", data: null });
});

export default { login, getAccessTokenByRefreshToken, resetPassword };
