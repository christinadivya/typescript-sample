import { appDataSource } from "../data-source";
import Customer from "../entity/Customer";
import ICustomerDao from "../interfaces/daos/ICustomer.dao";
import { ICustomer, ICustomerData } from "../interfaces/entity/ICustomer";

/**
 *  Customer DAO
 * @public
 */
export default class CustomerDao implements ICustomerDao {
  add(customerData: ICustomerData): Promise<ICustomerData> {
    return appDataSource.getRepository<ICustomerData>(Customer).save(customerData);
  }

  /**
   * Function to get user detail from customer table
   * @param condition - where condition should be passed here
   * @param selectPassword -Its a boolean value to select password from result
   */
  async getUserData(
    condition: any,
    selectPassword = false
  ): Promise<ICustomerData> {
    if (selectPassword) {
      return appDataSource
        .getRepository<ICustomerData>(Customer)
        .createQueryBuilder("c")
        .leftJoin("c.email", "email")
        .addSelect(["email.id", "email.email"])
        .where(condition)
        .addSelect("c.password")
        .getOne();
    }
    return appDataSource
      .getRepository<ICustomerData>(Customer)
      .createQueryBuilder("c")
      .leftJoin("c.email", "email")
      .addSelect(["email.id", "email.email"])
      .where(condition)
      .getOne();
  }
  /**
   * This function is to update customer detail
   * @param searchData - search condition
   * @param updateData - update data
   */
  public async update(
    searchData: ICustomerData,
    updateData: ICustomerData
  ): Promise<void> {
    await appDataSource
      .getRepository<ICustomer>(Customer)
      .update(searchData, updateData);
  }
}
