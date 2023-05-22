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
exports.cacheDuration = exports.verifyExpiry = exports.decryptData = exports.accountId = exports.otpCode = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const moment_1 = __importDefault(require("moment"));
const uuidv4_1 = require("uuidv4");
const envConfig = __importStar(require("../config/env"));
const config = envConfig.getConfig();
/**
 * To generate random otp
 * @returns Otp code
 */
async function otpCode() {
    return Math.floor(1000 + Math.random() * 9000);
}
exports.otpCode = otpCode;
/**
 * To generate random account id
 * @returns uuid
 */
async function accountId() {
    const accountId = (0, uuidv4_1.uuid)();
    return accountId;
}
exports.accountId = accountId;
/**
 * This function is to decrypt user detail
 * @param encryptedText - encrypted text field
 */
async function decryptData(encryptedText) {
    const bytes = crypto_js_1.default.AES.decrypt(encryptedText, config.encryptionKey);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
}
exports.decryptData = decryptData;
/**
 * This function is used to verify the expiry date time
 */
async function verifyExpiry(expiryDate) {
    const then = (0, moment_1.default)(expiryDate);
    const timeDiff = (0, moment_1.default)().diff((0, moment_1.default)(then, "DD/MM/YYYY HH:mm:ss"));
    return moment_1.default.duration(timeDiff).asMinutes().valueOf();
}
exports.verifyExpiry = verifyExpiry;
exports.cacheDuration = 15000000;
//# sourceMappingURL=appUtils.js.map