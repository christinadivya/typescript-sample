import { IEmail } from "./IEmail";

export enum CustomerStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
}

export interface ICustomer {
  id?: number;
  account_id?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  profile_pic?: string;
  status?: CustomerStatusEnum;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface ICustomerData extends ICustomer {
  email?: IEmail;
}

export interface IChangePasswordData extends ICustomer {
  email?: string;
  customer_id?: number;
  old_password?: string;
  new_password?: string;
}
