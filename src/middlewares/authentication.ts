/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from "express";
import i18next from "../config/i18nextConfig";
import logger from "../config/logger/Logger";
import CustomerDao from "../daos/customer.dao";
import customExceptions from "../helpers/customExceptions";
import JwtHandler from "../helpers/jwtHandler";

/**
 * JWT Authenticator
 * @public
 */
export default class JwtAuthenticator {
  private jwtHandler: JwtHandler;
  customerDao: CustomerDao;

  constructor(jwtHandler: JwtHandler, customerDao: CustomerDao) {
    this.jwtHandler = jwtHandler;
    this.customerDao = customerDao;
  }
  /**
   * This function is used to authorize and authenticate user
   */
  authenticateAndAuthorizeToken() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const jwtToken = req.get("authorization");
        const userToken = await this.jwtHandler.verifyToken(jwtToken);
        const user = await this.customerDao.getUserData({
          id: Number(userToken.id),
        });
        if (!user) {
          throw customExceptions.validationError(
            i18next.t("USER_ACCESS_DENIED")
          );
        }
        req.user = user;
        req.token = jwtToken;
        next();
      } catch (e) {
        logger.error(e.message);
        next(e);
      }
    };
  }
}
