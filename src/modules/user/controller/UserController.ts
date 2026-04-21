import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { RegisterClientDTO } from "../dtos/RegisterClient.DTO";

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const dados = req.body as RegisterClientDTO;

      const user = await this.userService.registerClient(dados);

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        message: "erro generico",
      });
    }
  }
}
