"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.comparePassword = void 0;
const bcrypt_1 = require("bcrypt");
async function comparePassword(plainPassword, password) {
    return (0, bcrypt_1.compare)(plainPassword, password);
}
exports.comparePassword = comparePassword;
/**
 * To hash the password given
 * @param password -  password of the user
 * @returns - hashed password
 */
async function hashPassword(password) {
    const salt = 10;
    return (0, bcrypt_1.hash)(password, salt);
}
exports.hashPassword = hashPassword;
//# sourceMappingURL=bcrypt.js.map