/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from "express";
import JwtHandler from "../helpers/jwtHandler";
/**
 * JWT Authenticator
 * @public
 */
export default class JwtAuthenticator {
  private jwtHandler: JwtHandler;
  // userDao: UserDao;

  constructor(jwtHandler: JwtHandler) {
    this.jwtHandler = jwtHandler;
    // this.userDao = userDao;
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
      // try {
      //   const jwtToken = req.get("authorization");
      //   const userToken = await this.jwtHandler.verifyToken(jwtToken);
      //   if (userToken.role !== UserRoleIdEnum.provider.toString()) {
      //     throw customExceptions.validationError(
      //       i18next.t("USER_ACCESS_DENIED")
      //     );
      //   }
      //   const user = await this.userDao.getUserData({
      //     id: Number(userToken.id),
      //   });
      //   if (!user) {
      //     throw customExceptions.validationError(
      //       i18next.t("USER_ACCESS_DENIED")
      //     );
      //   }
      //   req.user = user;
      //   req.token = jwtToken;
      //   next();
      // } catch (e) {
      //   logger.error(e.message);
      //   next(e);
      // }
    };
  }
}
