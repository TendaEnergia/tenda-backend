import { UserBaseDTO } from "./UserBase.DTO";

export interface RegisterClientDTO extends UserBaseDTO {
  full_name: string;
  cpf: string;
  phone: string;
}
