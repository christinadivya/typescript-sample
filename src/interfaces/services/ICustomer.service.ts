import { ICustomerData } from "../entity/ICustomer";

export default interface ICustomerService {
  add(customerData: ICustomerData): Promise<any>;
  get(id: number): Promise<ICustomerData>;
  edit(editData: ICustomerData, id: number): Promise<{ message: string }>;
}
