"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const Logger_1 = __importDefault(require("../config/logger/Logger"));
const customExceptions_1 = __importDefault(require("./customExceptions"));
/**
 *  Jwt handler
 * @public
 */
class JwtHandler {
    redisClient;
    secretKey;
    i18next;
    constructor(redisClient, secretKey, i18next) {
        this.redisClient = redisClient;
        this.secretKey = secretKey;
        this.i18next = i18next;
    }
    /**
     *This function is used to generate jwt token and store it in redis with hash key
     * @param user_id -id of the user
     * @param fcmToken -fcm token
     * @param role - role of the user by default it is set to user
     * @returns - returns randomly generated hash key
     */
    async generateToken(user_id, fcmToken, role = "user") {
        try {
            const jwtToken = jwt.sign({ id: user_id, fcmToken, role }, this.secretKey);
            const hashKey = crypto.randomBytes(20).toString("hex");
            await this.redisClient.setJWTToken(user_id, hashKey, jwtToken, fcmToken, role);
            return hashKey;
        }
        catch (err) {
            Logger_1.default.error(err);
            throw customExceptions_1.default.intrnlSrvrErr(this.i18next.t("tokenGenException"), err);
        }
    }
    /**
     *This function is used to verify the jwt token
     * @param token -hash token which to used to get jwt token from redis
     * @returns - returns object with decoded values
     */
    async verifyToken(token) {
        const resp = await this.redisClient.getValue(token);
        if (!resp) {
            throw customExceptions_1.default.unAuthenticatedAccess(this.i18next.t("INVALID_AUTHORIZATION"), 5);
        }
        const tokenDetails = JSON.parse(resp);
        const jwtToken = await this.redisClient.getValue(tokenDetails.jwtToken);
        if (Number(jwtToken) === tokenDetails.id) {
            const jwtPayload = jwt.verify(tokenDetails.jwtToken, this.secretKey);
            ["iat", "exp"].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
            return jwtPayload;
        }
        await this.redisClient.deleteKey(token);
        throw customExceptions_1.default.unAuthenticatedAccess(this.i18next.t("sessionExpired"), 5);
    }
    /**
     *This function is to delete hashKey from redis
     * @param token -hash token
     * @returns -returns 1 if token is deleted from redis
     */
    async deleteToken(token) {
        return this.redisClient.deleteKey(token);
    }
    /**
     *This function is to get user details from redis using hash key
     * @param token -hash token
     * @returns -object with user values
     */
    async getToken(token) {
        return this.redisClient.getValue(token);
    }
}
exports.default = JwtHandler;
//# sourceMappingURL=jwtHandler.js.map