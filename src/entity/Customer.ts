import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CustomerStatusEnum, ICustomer } from "../interfaces/entity/ICustomer";
import Email from "./Email";

@Entity({ name: "customers" })
export default class Customer implements ICustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true })
  account_id: string;

  @Column("varchar")
  first_name: string;

  @Column("varchar")
  last_name: string;

  @Column("text", { select: false, default: null })
  password: string;

  @Column("enum", { enum: CustomerStatusEnum, default: "ACTIVE" })
  status: CustomerStatusEnum;

  @Column("text", { nullable: true })
  profile_pic: string;

  @Column("date")
  @CreateDateColumn()
  created_at: Date;

  @Column("date")
  @UpdateDateColumn()
  updated_at: Date;

  @Column("date")
  @DeleteDateColumn({ default: null })
  deleted_at: Date;

  @OneToOne(() => Email, (email: Email) => email.mobile_customer_email, {
    cascade: true,
  })
  email: Email;
}
