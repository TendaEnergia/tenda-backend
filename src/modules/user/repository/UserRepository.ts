import { Repository } from "typeorm";
import { RegisterClientDTO } from "../dtos/RegisterClient.DTO";
import { User } from "../schema/User.schema";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  constructor(private repositorio: Repository<User>) {}

  async createUser(dados: RegisterClientDTO): Promise<User> {
    const user = this.repositorio.create({
      email: dados.email,
      password_hash: dados.password,
      role: "client",
      clientProfile: {
        full_name: dados.full_name,
        cpf: dados.cpf,
        phone: dados.phone,
      },
    });

    await this.repositorio.save(user);

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.repositorio.findOne({
      where: { email },
    });

    return user;
  }
}
