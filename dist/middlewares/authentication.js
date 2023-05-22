"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * JWT Authenticator
 * @public
 */
class JwtAuthenticator {
    jwtHandler;
    // userDao: UserDao;
    constructor(jwtHandler) {
        this.jwtHandler = jwtHandler;
        // this.userDao = userDao;
    }
    /**
     * This function is used to authorize and authenticate user
     */
    authenticateAndAuthorizeToken() {
        return async (req, res, next) => {
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
exports.default = JwtAuthenticator;
//# sourceMappingURL=authentication.js.map