"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitHandler = void 0;
const limiter_1 = require("limiter");
const i18nextConfig_1 = __importDefault(require("../config/i18nextConfig"));
const Logger_1 = __importDefault(require("../config/logger/Logger"));
const customExceptions_1 = __importDefault(require("./customExceptions"));
const limiter = new limiter_1.RateLimiter({
    tokensPerInterval: 3,
    interval: "minute",
    fireImmediately: true,
});
async function limitHandler(req, res, next) {
    try {
        const remainingRequests = await limiter.removeTokens(1);
        if (remainingRequests < 0) {
            throw customExceptions_1.default.unAuthenticatedAccess(i18nextConfig_1.default.t("requestOverload"), 7);
        }
        else {
            next();
        }
    }
    catch (er) {
        Logger_1.default.error(er.message);
        next(er);
    }
}
exports.limitHandler = limitHandler;
//# sourceMappingURL=rateLimiter.js.map