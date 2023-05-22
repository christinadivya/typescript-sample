"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18nextConfig_1 = __importDefault(require("../config/i18nextConfig"));
const Logger_1 = __importDefault(require("../config/logger/Logger"));
const customExceptions_1 = __importDefault(require("../helpers/customExceptions"));
/**
 * JWT Authenticator
 * @public
 */
class JwtAuthenticator {
    jwtHandler;
    customerDao;
    constructor(jwtHandler, customerDao) {
        this.jwtHandler = jwtHandler;
        this.customerDao = customerDao;
    }
    /**
     * This function is used to authorize and authenticate user
     */
    authenticateAndAuthorizeToken() {
        return async (req, res, next) => {
            try {
                const jwtToken = req.get("authorization");
                const userToken = await this.jwtHandler.verifyToken(jwtToken);
                const user = await this.customerDao.getUserData({
                    id: Number(userToken.id),
                });
                if (!user) {
                    throw customExceptions_1.default.validationError(i18nextConfig_1.default.t("USER_ACCESS_DENIED"));
                }
                req.user = user;
                req.token = jwtToken;
                next();
            }
            catch (e) {
                Logger_1.default.error(e.message);
                next(e);
            }
        };
    }
}
exports.default = JwtAuthenticator;
//# sourceMappingURL=authentication.js.map