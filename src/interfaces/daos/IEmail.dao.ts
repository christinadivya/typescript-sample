import { IEmail } from "../entity/IEmail";

export default interface ICustomerDao {
  checkEmailExists(condition: Record<string, any>): Promise<IEmail>;
  update(condition: IEmail, emailData: IEmail): Promise<void>;
}
