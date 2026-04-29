import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../modules/user/schema/User.schema";

export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { role } = request.user;

  // Comparando com o Enum para evitar erro de digitação
  if (role !== UserRole.ADMIN) {
    response.status(403).json({ 
      message:"Acesso negado. Esta rota é exclusiva para administradores. Você não possui ATORIZAÇÃO e pode ser PROCESSADO por isso!"  
    });
    return;
  }

  return next();
}
