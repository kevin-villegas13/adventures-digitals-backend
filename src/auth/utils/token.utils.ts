import { Request } from "express";

export const extractTokenFromHeader = (req: Request): string | undefined => {
  const authorization = req.headers.authorization;
  if (!authorization) return undefined;
  const [bearer, token] = authorization.split(" ");
  return bearer === "Bearer" ? token : undefined;
};
