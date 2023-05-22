"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Email_1 = __importDefault(require("../entity/Email"));
/**
 *  Dropdown Value DAO
 * @public
 */
class EmailDao {
    update(arg0, email) {
        throw new Error("Method not implemented.");
    }
    /**
     * This function is to check particular email is already in use or not
     * @param condition - search condition
     */
    async checkEmailExists(condition) {
        const emailExists = data_source_1.appDataSource
            .getRepository(Email_1.default)
            .createQueryBuilder("e")
            .where(condition);
        return emailExists.getOne();
    }
}
exports.default = EmailDao;
//# sourceMappingURL=email.dao.js.map