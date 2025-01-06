import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "./interface/auth-request.interface";

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

// Función para extraer el token del encabezado
const extractTokenFromHeader = (req: Request): string | undefined => {
  const authorization = req.headers.authorization;
  if (!authorization) return undefined;

  const [type, token] = authorization.split(" ");
  return type === "Bearer" ? token : undefined;
};
