import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.schema";

@Entity("client_profiles") // [cite: 14]
export class ClientProfile {
  @PrimaryGeneratedColumn("uuid") // [cite: 22]
  id!: string;

  @Column({ length: 255 })
  full_name!: string; // [cite: 16]

  @Column({ length: 14 })
  cpf!: string; // [cite: 18]

  @Column({ length: 20 })
  phone!: string; // [cite: 19]

  @CreateDateColumn()
  created_at!: Date; // [cite: 20]

  @UpdateDateColumn()
  updated_at!: Date; // [cite: 21]

  // Relacionamento com a tabela User
  @OneToOne(() => User, (user) => user.clientProfile)
  @JoinColumn({ name: "user_id" }) // Aponta para a coluna 'user_id' no banco [cite: 15]
  user!: User;
}
