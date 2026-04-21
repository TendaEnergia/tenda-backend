import { UserController } from "../../modules/user/controller/UserController";
import { UserRepository } from "../../modules/user/repository/UserRepository";
import { User } from "../../modules/user/schema/User.schema";
import { UserService } from "../../modules/user/service/UserService";
import { AppDataSource } from "../database/data-source";

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const userService = new UserService(userRepository);

export const userController = new UserController(userService);
