import { Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm"; 
import { User } from "../schema/User.schema";
import { IUserRepository } from "../interfaces/IUserRepository";
import { RegisterClientInput } from "./inputs/RegisterClient.input";
import { RegisterAdminInput } from "./inputs/RegisterAdmin.input";
import { UpdateClientInput } from "./inputs/UpdateClient.input";
import { UpdateAdminInput } from "./inputs/UpdateAdmin.input";
import { ClientProfile } from "../schema/ClientProfile.schema";
import { AdminProfile } from "../schema/AdminProfile.schema";

export class UserRepository implements IUserRepository {
  constructor(private repositorio: Repository<User>) {}

  async createUser(dados: RegisterClientInput): Promise<User> {
    return await this.repositorio.manager.transaction(async (tm) => {
      const user = tm.create(User, {
        email: dados.email,
        password_hash: dados.password_hash,
        role: "client",
        clientProfile: {
          full_name: dados.full_name,
          cpf: dados.cpf,
          phone: dados.phone,
        },
      });

      return await tm.save(user);
    });
  }

  async createAdmin(dados: RegisterAdminInput): Promise<User> {
    return await this.repositorio.manager.transaction(async (tm) => {
      const admin = tm.create(User, {
        email: dados.email,
        password_hash: dados.password_hash,
        role: "admin",
        adminProfile: {
          full_name: dados.full_name,
          department: dados.department,
        },
      });

      return await tm.save(admin);
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.repositorio.findOne({
      where: { email },
      relations: ["clientProfile", "adminProfile"],
    });

    return user;
  }

  async findUserByEmailWithPassword(email: string): Promise<User | null> {
    const user = await this.repositorio.findOne({
      where: { email },
      select: ["id", "email", "password_hash", "role"],
      relations: ["clientProfile", "adminProfile"],
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return await this.repositorio.findOne({
      where: { id },
      relations: ["clientProfile", "adminProfile"],
      select: ["id", "email", "role", "created_at", "updated_at"],
    });
  }

  async updateClient(userId: string, dados: UpdateClientInput): Promise<void> {
    await this.repositorio.manager.transaction(async (tm) => {
      // O 'as QueryDeepPartialEntity' resolve o erro ts(2379)
      // ao forçar o objeto a aceitar os campos como parciais/opcionais.
      const updateData = dados as QueryDeepPartialEntity<ClientProfile>;

      await tm.update(
        ClientProfile,
        { user: { id: userId } },
        updateData
      );
    });
  }

  async updateAdmin(userId: string, dados: UpdateAdminInput): Promise<void> {
    await this.repositorio.manager.transaction(async (tm) => {
      const updateData = dados as QueryDeepPartialEntity<AdminProfile>;

      await tm.update(
        AdminProfile,
        { user: { id: userId } },
        updateData
      );
    });
  }
}