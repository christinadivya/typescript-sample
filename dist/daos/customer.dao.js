"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Customer_1 = __importDefault(require("../entity/Customer"));
/**
 *  Customer DAO
 * @public
 */
class CustomerDao {
    save(customerData) {
        throw new Error("Method not implemented.");
    }
    add(customerData) {
        return data_source_1.appDataSource.getRepository(Customer_1.default).save(customerData);
    }
    /**
     * Function to get user detail from customer table
     * @param condition - where condition should be passed here
     * @param selectPassword -Its a boolean value to select password from result
     */
    async getUserData(condition, selectPassword = false) {
        if (selectPassword) {
            return data_source_1.appDataSource
                .getRepository(Customer_1.default)
                .createQueryBuilder("c")
                .leftJoin("c.email", "email")
                .addSelect(["email.id", "email.email"])
                .where(condition)
                .addSelect("c.password")
                .getOne();
        }
        return data_source_1.appDataSource
            .getRepository(Customer_1.default)
            .createQueryBuilder("c")
            .leftJoin("c.email", "email")
            .addSelect(["email.id", "email.email"])
            .where(condition)
            .getOne();
    }
    /**
     * This function is to update customer detail
     * @param searchData - search condition
     * @param updateData - update data
     */
    async update(searchData, updateData) {
        await data_source_1.appDataSource
            .getRepository(Customer_1.default)
            .update(searchData, updateData);
    }
}
exports.default = CustomerDao;
//# sourceMappingURL=customer.dao.js.map