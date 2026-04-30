import { User } from "../schema/User.schema";
import { RegisterClientInput } from "../repository/inputs/RegisterClient.input";
import { RegisterAdminInput } from "../repository/inputs/RegisterAdmin.input";
import { UpdateClientInput } from "../repository/inputs/UpdateClient.input";
import { UpdateAdminInput } from "../repository/inputs/UpdateAdmin.input";

export interface IUserRepository {
  createUser(dados: RegisterClientInput): Promise<User>;
  createAdmin(dados: RegisterAdminInput): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByEmailWithPassword(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateClient(userId: string, dados: UpdateClientInput): Promise<void>;
  updateAdmin(userId: string, dados: UpdateAdminInput): Promise<void>;
}