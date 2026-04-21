import { Router } from "express";
import userRoutes from "./modules/user/userRoutes";

const routesMain = Router();

routesMain.use(userRoutes);

export default routesMain;
