import { AppError } from "./AppError";

export class UserAlreadyUserExistsError extends AppError {
  constructor() {
    super("Esse usuário ja existe", 409);
  }
}
