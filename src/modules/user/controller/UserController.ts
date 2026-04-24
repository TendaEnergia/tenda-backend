import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { RegisterClientDTO } from "../dtos/RegisterClient.DTO";
import { RegisterAdminDTO } from "../dtos/RegisterAdmin.DTO";
import { asyncHandler } from "../../../shared/middlewares/asyncHandler";

export class UserController {
  constructor(private userService: UserService) {}

  registerClient = asyncHandler(async (req: Request, res: Response) => {

    const dados = req.body as RegisterClientDTO;
    const user = await this.userService.registerClient(dados);
    res.status(201).json(user);
    
  });

  registerAdmin = asyncHandler(async (req: Request, res: Response) => {

    const dados = req.body as RegisterAdminDTO;
    const admin = await this.userService.registerAdmin(dados);
    res.status(201).json(admin);

  });
}
