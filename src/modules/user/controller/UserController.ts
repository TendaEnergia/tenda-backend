import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { registerClientSchema } from "../validators/RegisterClient.DTO";
import { registerAdminSchema } from "../validators/RegisterAdmin.DTO";
import { updateAdminSchema } from "../validators/UpdateAdmin.DTO";
import { updateClientSchema } from "../validators/UpdateClient.DTO";
import { asyncHandler } from "../../../shared/middlewares/asyncHandler";
import {
  ApiResponse,
  RegisterResponse,
} from "../../../shared/types/ApiResponse";

export class UserController {
  constructor(private userService: UserService) {}

  registerClient = asyncHandler(async (req: Request, res: Response) => {
    const dados = registerClientSchema.parse(req.body);
    const user = await this.userService.registerClient(dados);

    const response: ApiResponse<RegisterResponse> = {
      status: "success",
      data: user,
    };
    res.status(201).json(response);
  });

  registerAdmin = asyncHandler(async (req: Request, res: Response) => {
    const dados = registerAdminSchema.parse(req.body);
    const admin = await this.userService.registerAdmin(dados);

    const response: ApiResponse<RegisterResponse> = {
      status: "success",
      data: admin,
    };
    res.status(201).json(response);
  });
  
  list = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const user = await this.userService.list(userId);

    const response: ApiResponse<any> = {
      status: "success",
      data: user,
    };
    res.status(200).json(response);
  });

  // CORREÇÃO AQUI: Adicionado o asyncHandler e formatada a resposta
  editar = asyncHandler(async (req: Request, res: Response) => {
    const { id, role } = req.user; 
    
    // Escolha do schema baseada no role vindo do token
    const schema = role === "admin" ? updateAdminSchema : updateClientSchema;
    
    // Validação dos dados que o usuário enviou no body
    const dadosValidados = schema.parse(req.body);

    const usuarioAtualizado = await this.userService.editar(id, role, dadosValidados);

    const response: ApiResponse<any> = {
      status: "success",
      data: usuarioAtualizado,
    };
    
    res.status(200).json(response);
  });
}