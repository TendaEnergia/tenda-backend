import { UserAlreadyUserExistsError } from "../../../shared/errors/UserAlreadyExitis";
import { RegisterAdminDTO } from "../dtos/RegisterAdmin.DTO";
import { RegisterClientDTO } from "../dtos/RegisterClient.DTO";
import { IUserRepository } from "../repository/IUserRepository";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  private async verifyUserExists(email: string) {
    const userExists = await this.userRepository.findUserByEmail(email);

    if (userExists) {
      throw new UserAlreadyUserExistsError();
    }
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async registerClient(userData: RegisterClientDTO) {
    if (
      !userData.email ||
      !userData.cpf ||
      !userData.full_name ||
      !userData.password ||
      !userData.phone
    ) {
      throw new Error("Há campos faltando.");
    }

    await this.verifyUserExists(userData.email);

    const password_hash = await this.hashPassword(userData.password);

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

  async registerAdmin(userData: RegisterAdminDTO) {
    if (
      !userData.department ||
      !userData.email ||
      !userData.full_name ||
      !userData.password
    ) {
      throw new Error("Há campos faltando.");
    }

    await this.verifyUserExists(userData.email);

    const password_hash = await this.hashPassword(userData.password);

    const user = await this.userRepository.createAdmin({
      email: userData.email,
      password: password_hash,
      full_name: userData.full_name,
      department: userData.department,
    });

    return {
      usuario: {
        id: user.id,
        name: user.adminProfile.full_name,
      },
    };
  }
}
