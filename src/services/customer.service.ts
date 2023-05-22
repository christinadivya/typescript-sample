import { i18n } from "i18next";
import { Not } from "typeorm";
import { constants } from "../config/constants";
import CustomerDao from "../daos/customer.dao";
import EmailDao from "../daos/email.dao";
import { accountId, decryptData } from "../helpers/appUtils";
import customExceptions from "../helpers/customExceptions";
import { Get, Post, Put } from "../helpers/decorators/handlers.decorator";
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
  phoneDao: any;
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

  /**
   * Function to get customer detail
   * @param {Object} customerId - Primary id of the customer
   */
  @Get("/")
  async get(customerId: number): Promise<ICustomerData> {
    // Validate customer id
    const searchUserCondition = {
      id: customerId,
    };
    const userDetail = await this.customerDao.getUserData(searchUserCondition);
    return userDetail;
  }
  /**
   * This function used to edit the customer by the provider
   * @param {object} userData  - Customer object contained first_name, last_name, display_name, invoice_name, emails, phone_numbers, address
   * @returns {string} - Success Message
   */
  @Put("/")
  async edit(
    userData: ICustomerData,
    id: number
  ): Promise<{
    message: string;
  }> {
    await this.editByCustomer(userData, id);

    return { message: this.i18next.t("EDIT_PROFILE") };
  }
  /**
   * This function used to edit the profile details by customer
   * @param customerData
   * @param user_id
   */
  async editByCustomer(
    customerData: ICustomerData,
    user_id: number
  ): Promise<void> {
    customerData.account_id = await accountId();
    // Decrypt email and password
    customerData.email.email = await decryptData(customerData.email.email);
    if (customerData.email.email) {
      // Existing Email Checking
      const emailExists = await this.emailDao.checkEmailExists({
        email: customerData.email.email,
        customer_id: Not(user_id),
      });
      if (emailExists) {
        throw customExceptions.validationError(this.i18next.t("EMAIL_EXISTS"));
      }
      // email save
      await this.emailDao.update({ customer_id: user_id }, customerData.email);
      delete customerData.email;
      // customer save
      await this.customerDao.update({ id: user_id }, customerData);
      return null;
    }
    throw customExceptions.validationError(this.i18next.t("ENCRYPT_VALUE"));
  }
}
