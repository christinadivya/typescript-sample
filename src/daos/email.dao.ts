import { appDataSource } from "../data-source";
import Email from "../entity/Email";
import IEmailDao from "../interfaces/daos/IEmail.dao";
import { IEmail } from "../interfaces/entity/IEmail";

/**
 *  Dropdown Value DAO
 * @public
 */
export default class EmailDao implements IEmailDao {
  /**
   * This function is to check particular email is already in use or not
   * @param condition - search condition
   */
  async checkEmailExists(condition: Record<string, any>): Promise<IEmail> {
    const emailExists = appDataSource
      .getRepository<IEmail>(Email)
      .createQueryBuilder("e")
      .where(condition);
    return emailExists.getOne();
  }

  /**
   * This function is to check particular email is already in use or not
   * @param condition - search condition
   */
  async update(condition: IEmail, emailData: IEmail): Promise<void> {
    await appDataSource
    .getRepository<IEmail>(Email)
    .update(condition, emailData);
  }
}
