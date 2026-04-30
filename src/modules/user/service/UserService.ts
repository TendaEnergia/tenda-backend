import { UserAlreadyUserExistsError } from "../../../shared/errors/UserAlreadyExitis";
import { RegisterAdmin } from "../validators/RegisterAdmin.DTO";
import { RegisterClient } from "../validators/RegisterClient.DTO";
import { IUserRepository } from "../interfaces/IUserRepository";
import { RegisterResponse } from "../../../shared/types/ApiResponse";
import { UpdateClientInput } from "../repository/inputs/UpdateClient.input";
import { UpdateAdminInput } from "../repository/inputs/UpdateAdmin.input";
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

  async registerClient(userData: RegisterClient): Promise<RegisterResponse> {
    await this.verifyUserExists(userData.email);

    const password_hash = await this.hashPassword(userData.password);

    const user = await this.userRepository.createUser({
      cpf: userData.cpf,
      email: userData.email,
      password_hash: password_hash,
      full_name: userData.full_name,
      phone: userData.phone,
    });

    return {
      id: user.id,
      email: user.email,
      role: "client",
      full_name: user.clientProfile?.full_name?? "",
      createdAt: user.created_at,
    };
  }

  async registerAdmin(userData: RegisterAdmin): Promise<RegisterResponse> {
    await this.verifyUserExists(userData.email);

    const password_hash = await this.hashPassword(userData.password);

    const user = await this.userRepository.createAdmin({
      email: userData.email,
      password_hash: password_hash,
      full_name: userData.full_name,
      department: userData.department,
    });

    return {
      id: user.id,
      email: user.email,
      role: "admin",
      full_name: user.adminProfile.full_name,
      createdAt: user.created_at,
    };
  }

  async list(userId: string) {
  const user = await this.userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found")
  }
  if (user.role === "admin") {
    delete (user as any).clientProfile;
  } else if (user.role === "client") {
    delete (user as any).adminProfile;
  }
  return user;
}

async editar(userId: string, role: string, dados: any) {
  // 1. Busca segurança
  const user = await this.userRepository.findById(userId);
  if (!user) throw new Error("Usuário não encontrado");

  // 2. Se mudou e-mail, checa duplicata
  if (dados.email && dados.email !== user.email) {
    const emailExists = await this.userRepository.findUserByEmail(dados.email);
    if (emailExists) throw new Error("E-mail já está em uso");
  }

  // 3. Direciona para o repositório correto
  if (role === "admin") {
    await this.userRepository.updateAdmin(userId, dados);
  } else {
    await this.userRepository.updateClient(userId, dados);
  }

  // 4. Retorna o usuário atualizado (reutilizando seu findById)
  return await this.userRepository.findById(userId);
}

}
