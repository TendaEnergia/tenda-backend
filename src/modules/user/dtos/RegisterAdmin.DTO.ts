import { UserBaseDTO } from "./UserBase.DTO";

export interface RegisterAdminDTO extends UserBaseDTO {
  full_name: string;
  department: string;
  role: string;
}
