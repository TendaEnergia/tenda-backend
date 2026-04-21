import { Router } from "express";
import { userController } from "../../shared/container";

const userRoutes = Router();

userRoutes.post("/register/user", userController.register.bind(userController));

export default userRoutes;
