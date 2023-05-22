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
    return appDataSource.getRepository<ICustomer>(Customer).save(customerData);
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
        .leftJoin("c.address", "address")
        .leftJoin("c.phone_number", "phone_number")
        .leftJoin("c.email", "email")
        .addSelect([
          "address.id",
          "address.zip_code",
          "address.address_line_1",
          "address.address_line_2",
          "address.state",
          "address.city",
          "address.latitude",
          "address.longitude",
          "address.address_type",
          "email.id",
          "email.email",
          "phone_number.id",
          "phone_number.phone",
        ])
        .where(condition)
        .addSelect("c.password")
        .getOne();
    }
    return appDataSource
      .getRepository<ICustomerData>(Customer)
      .createQueryBuilder("c")
      .leftJoin("c.address", "address")
      .leftJoin("c.phone_number", "phone_number")
      .leftJoin("c.email", "email")
      .addSelect([
        "address.id",
        "address.zip_code",
        "email.id",
        "email.email",
        "phone_number.id",
        "phone_number.phone",
      ])
      .where(condition)
      .getOne();
  }
  /**
   * This function is to update customer detail
   * @param searchData - search condition
   * @param updateData - update data
   */
  public async updateUserData(
    searchData: ICustomerData,
    updateData: ICustomerData
  ): Promise<void> {
    await appDataSource
      .getRepository<ICustomer>(Customer)
      .update(searchData, updateData);
  }
}
