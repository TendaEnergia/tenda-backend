import { RegisterClientDTO } from "../dtos/RegisterClient.DTO";
import { User } from "../schema/User.schema";

export interface IUserRepository {
  createUser(userData: RegisterClientDTO): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
