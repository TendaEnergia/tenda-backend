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

@Entity("admin_profiles") // [cite: 1]
export class AdminProfile {
  @PrimaryGeneratedColumn("uuid") // [cite: 5]
  id!: string; // [cite: 6]

  @Column({ length: 255 })
  full_name!: string; // [cite: 7]

  @Column({ length: 100 })
  department!: string; // [cite: 9]

  @CreateDateColumn()
  created_at!: Date; // [cite: 12]

  @UpdateDateColumn()
  updated_at!: Date; // [cite: 13]

  // Relacionamento com a tabela User
  @OneToOne(() => User, (user) => user.adminProfile)
  @JoinColumn({ name: "user_id" }) // Aponta para a coluna 'user_id' no banco [cite: 4]
  user!: User;
}
