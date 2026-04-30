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

userRoutes.get(
    "/me",
    ensureAuthenticated,
    userController.list.bind(userController)
);

userRoutes.patch(
  "/edit", 
  ensureAuthenticated,
  (req, res, next) => userController.editar(req, res, next)
);
export { userRoutes };
