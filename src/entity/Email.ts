import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IEmail } from "../interfaces/entity/IEmail";
import Customer from "./Customer";

@Entity({ name: "emails" })
export default class Email implements IEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  email: string;

  @Column("int", { nullable: true })
  customer_id: number;

  @Column("date")
  @CreateDateColumn()
  created_at: Date;

  @Column("date")
  @UpdateDateColumn()
  updated_at: Date;

  @Column("date")
  @DeleteDateColumn({ default: null })
  deleted_at: Date;

  @OneToOne(() => Customer, (customer: Customer) => customer.email, {
    cascade: true,
  })
  @JoinColumn({ name: "customer_id" })
  mobile_customer_email: Customer;
}
