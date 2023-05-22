import { ICustomerData } from "../entity/ICustomer";

export default interface ICustomerDao {
  add(customerData: ICustomerData): Promise<ICustomerData>;
  getUserData(condition: any, selectPassword: boolean): Promise<ICustomerData>;
  update(
    searchData: ICustomerData,
    updateData: ICustomerData
  ): Promise<void>;
}
