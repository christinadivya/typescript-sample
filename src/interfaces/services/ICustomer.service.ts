import { ICustomerData } from '../entity/ICustomer';

export default interface ICustomerService {
  add(customerData: ICustomerData): Promise<any>;
}
