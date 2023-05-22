import { i18n } from "i18next";
import { constants } from "../config/constants";
import CustomerDao from "../daos/customer.dao";
import EmailDao from "../daos/email.dao";
import { accountId, decryptData } from "../helpers/appUtils";
import customExceptions from "../helpers/customExceptions";
import { Post } from "../helpers/decorators/handlers.decorator";
import Service from "../helpers/decorators/service.decorator";
import JwtHandler from "../helpers/jwtHandler";
import { ICustomerData } from "../interfaces/entity/ICustomer";
import ICustomerService from "../interfaces/services/ICustomer.service";
import { hashPassword } from "../lib/bcrypt";
import { LSRedisClient } from "../redis/redis";

/**
 * User Service
 * @public
 */

@Service("/customers")
export default class CustomerService implements ICustomerService {
  i18next: i18n;
  redisClient: LSRedisClient;
  jwtHandler: JwtHandler;
  customerDao: CustomerDao;
  emailDao: EmailDao;
  constructor(
    i18next: i18n,
    redisClient: LSRedisClient,
    jwtHandler: JwtHandler,
    customerDao: CustomerDao,
    emailDao: EmailDao
  ) {
    this.i18next = i18next;
    this.redisClient = redisClient;
    this.jwtHandler = jwtHandler;
    this.customerDao = customerDao;
    this.emailDao = emailDao;
  }

  /**
   * Create provider by super admin
   * @param userData
   * @returns
   */
  @Post("/sign-up")
  async add(customerData: ICustomerData): Promise<any> {
    customerData.account_id = await accountId();
    // Decrypt email and password
    customerData.email.email = await decryptData(customerData.email.email);
    customerData.password = await decryptData(customerData.password);

    if (customerData.email.email && customerData.password) {
      // Password Hash
      customerData.password = await hashPassword(customerData.password);

      // Existing Email Checking
      const emailExists = await this.emailDao.checkEmailExists({
        email: customerData.email.email,
      });
      if (emailExists) {
        throw customExceptions.validationError(this.i18next.t("EMAIL_EXISTS"));
      }

      const savedData = await this.customerDao.add(customerData);

      // Create Token
      const token = await this.jwtHandler.generateToken(
        savedData.id,
        "",
        constants.CUSTOMER
      );
      // get Customer detail
      const customerDetail = await this.customerDao.getUserData(
        {
          id: savedData.id,
        },
        true
      );
      return {
        token,
        ...customerDetail,
      };
    }

    throw customExceptions.validationError(this.i18next.t("ENCRYPT_VALUE"));
  }
}
