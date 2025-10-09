import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import _env from "../config";

interface iTokenProps {
  userPayload: User;
  secret?: string;
  expire?: string;
}

const env = _env.jwt;

const payloadMaker = ({ id, email, role }: User) => {
  return { id, email, role };
};

//* GENERATE ACCESS TOKEN
export const generateAccessToken = (
  userPayload: User,
  secret = env.access_token_secret,
  expiresIn = env.access_token_expire_time,
) => {
  const access_token = jwt.sign(payloadMaker(userPayload), secret, {
    algorithm: env.access_token_algorithm,
    expiresIn,
  } as jwt.SignOptions);

  if (!access_token) throw new Error("Failed to generate access token");

  return access_token;
};

//* GENERATE REFRESH TOKEN
export const generateRefreshToken = (
  userPayload: User,
  secret = env.refresh_token_secret,
  expiresIn = env.refresh_token_expire_time,
) => {
  const refresh_token = jwt.sign(payloadMaker(userPayload), secret, {
    algorithm: env.refresh_token_algorithm,
    expiresIn,
  } as jwt.SignOptions);

  if (!refresh_token) throw new Error("Failed to generate refresh token");

  return refresh_token;
};

//* VERIFY ACCESS TOKEN
export const verifyAccessToken = (token: string): jwt.JwtPayload => {
  const accessToken = jwt.verify(token, env.access_token_secret) as jwt.JwtPayload;
  if (!accessToken) throw new Error("Token is not valid");
  return accessToken;
};

//* VERIFY REFRESH TOKEN
export const verifyRefreshToken = (token: string): jwt.JwtPayload => {
  const refreshToken = jwt.verify(token, env.refresh_token_secret) as jwt.JwtPayload;
  if (!refreshToken) throw new Error("Token is not valid");
  return refreshToken;
};
