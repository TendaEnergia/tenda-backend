import { Router } from "express";
import { userController } from "../../shared/container";

const userRoutes = Router();

userRoutes.post(
  "/register/user",
  userController.registerClient.bind(userController),
);

userRoutes.post(
  "/register/admin",
  userController.registerAdmin.bind(userController),
);

export default userRoutes;
