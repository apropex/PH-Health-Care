import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../error-handler/AppError";
import { verifyAccessToken } from "../../utils/jwt";
import sCode from "../../utils/statusCode";

export const tokenVerifier = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) return next(new AppError(sCode.UNAUTHORIZED, "Token did not arrive"));
    const decoded = verifyAccessToken(token);

    req.decoded = decoded as JwtPayload;
    next();
  } catch {
    next(new AppError(sCode.UNAUTHORIZED, "Invalid token"));
  }
};
