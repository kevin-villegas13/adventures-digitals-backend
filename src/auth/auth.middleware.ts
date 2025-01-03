import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "./interface/auth-request.interface";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Extraer el token del encabezado Authorization
  const token = extractTokenFromHeader(req);
  
  if (!token) return res.status(401).json({ message: "Unauthorized: Token is missing" });

  try {
    // Verificar el token
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    // Asignar el payload al objeto `request`
    req.user = payload;

    // Continuar al siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Función para extraer el token del encabezado
const extractTokenFromHeader = (req: Request): string | undefined => {
  const authorization = req.headers.authorization;
  if (!authorization) return undefined;

  const [type, token] = authorization.split(" ");
  return type === "Bearer" ? token : undefined;
};
