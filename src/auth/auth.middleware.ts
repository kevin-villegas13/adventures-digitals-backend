import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "./interface/auth-request.interface";
import { extractTokenFromHeader } from "./utils/token.utils";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = extractTokenFromHeader(req);

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Token is missing" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
