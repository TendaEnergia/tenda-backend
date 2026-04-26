import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AdminProfile } from "./AdminProfile.schema";
import { ClientProfile } from "./ClientProfile.schema";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 20 })
  role!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 100 })
  password_hash!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 14 })
  cpf!: string;

  @Column({ nullable: true })
  phone!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;

  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user, {
    cascade: true,
  })
  adminProfile!: AdminProfile;

  @OneToOne(() => ClientProfile, (clientProfile) => clientProfile.user, {
    cascade: true,
  })
  clientProfile!: ClientProfile;
}
