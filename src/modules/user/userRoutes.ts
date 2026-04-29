import { Router } from "express";
import { userController } from "../../shared/container";
import { ensureAuthenticated } from "../../shared/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../shared/middlewares/ensureAdmin";

const userRoutes = Router();

userRoutes.post("/", userController.registerClient.bind(userController));

userRoutes.post(
    "/admin", 
    ensureAuthenticated,
    ensureAdmin,
    userController.registerAdmin.bind(userController)
);

export { userRoutes };
