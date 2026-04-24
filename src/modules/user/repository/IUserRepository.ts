import { RegisterAdminDTO } from "../dtos/RegisterAdmin.DTO";
import { RegisterClientDTO } from "../dtos/RegisterClient.DTO";
import { User } from "../schema/User.schema";

export interface IUserRepository {
  createUser(userData: RegisterClientDTO): Promise<User>;
  createAdmin(userData: RegisterAdminDTO): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
