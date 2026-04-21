import { RegisterClientDTO } from "../dtos/RegisterClient.DTO";
import { IUserRepository } from "../repository/IUserRepository";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async registerClient(userData: RegisterClientDTO) {
    if (
      !userData.cpf ||
      !userData.email ||
      !userData.full_name ||
      !userData.password ||
      !userData.phone
    ) {
      throw new Error("Há campos faltando.");
    }

    const userExists = await this.userRepository.findUserByEmail(
      userData.email,
    );

    if (userExists) {
      throw new Error("Usuario ja existente.");
    }

    const password_hash = await bcrypt.hash(userData.password, 12);

    const user = await this.userRepository.createUser({
      cpf: userData.cpf,
      email: userData.email,
      password: password_hash,
      full_name: userData.full_name,
      phone: userData.phone,
    });

    return {
      usuario: {
        id: user.id,
        name: user.clientProfile.full_name,
      },
    };
  }
}
