"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const constants_1 = require("../config/constants");
const customer_dao_1 = __importDefault(require("../daos/customer.dao"));
const email_dao_1 = __importDefault(require("../daos/email.dao"));
const appUtils_1 = require("../helpers/appUtils");
const customExceptions_1 = __importDefault(require("../helpers/customExceptions"));
const handlers_decorator_1 = require("../helpers/decorators/handlers.decorator");
const service_decorator_1 = __importDefault(require("../helpers/decorators/service.decorator"));
const jwtHandler_1 = __importDefault(require("../helpers/jwtHandler"));
const bcrypt_1 = require("../lib/bcrypt");
const redis_1 = require("../redis/redis");
/**
 * User Service
 * @public
 */
let CustomerService = class CustomerService {
    i18next;
    redisClient;
    jwtHandler;
    customerDao;
    emailDao;
    phoneDao;
    constructor(i18next, redisClient, jwtHandler, customerDao, emailDao) {
        this.i18next = i18next;
        this.redisClient = redisClient;
        this.jwtHandler = jwtHandler;
        this.customerDao = customerDao;
        this.emailDao = emailDao;
    }
    /**
     * Create provider by super admin
     * @param userData
     * @returns
     */
    async add(customerData) {
        customerData.account_id = await (0, appUtils_1.accountId)();
        // Decrypt email and password
        customerData.email.email = await (0, appUtils_1.decryptData)(customerData.email.email);
        customerData.password = await (0, appUtils_1.decryptData)(customerData.password);
        if (customerData.email.email && customerData.password) {
            // Password Hash
            customerData.password = await (0, bcrypt_1.hashPassword)(customerData.password);
            // Existing Email Checking
            const emailExists = await this.emailDao.checkEmailExists({
                email: customerData.email.email,
            });
            if (emailExists) {
                throw customExceptions_1.default.validationError(this.i18next.t("EMAIL_EXISTS"));
            }
            const savedData = await this.customerDao.add(customerData);
            // Create Token
            const token = await this.jwtHandler.generateToken(savedData.id, "", constants_1.constants.CUSTOMER);
            // get Customer detail
            const customerDetail = await this.customerDao.getUserData({
                id: savedData.id,
            }, true);
            return {
                token,
                ...customerDetail,
            };
        }
        throw customExceptions_1.default.validationError(this.i18next.t("ENCRYPT_VALUE"));
    }
    /**
     * Function to get customer detail
     * @param {Object} customerId - Primary id of the customer
     */
    async get(customerId) {
        // Validate customer id
        const searchUserCondition = {
            id: customerId,
        };
        const userDetail = await this.customerDao.getUserData(searchUserCondition);
        return userDetail;
    }
    /**
     * This function used to edit the customer by the provider
     * @param {object} userData  - Customer object contained first_name, last_name, display_name, invoice_name, emails, phone_numbers, address
     * @returns {string} - Success Message
     */
    async edit(userData, id) {
        await this.editByCustomer(userData, id);
        return { message: this.i18next.t("EDIT_PROFILE") };
    }
    /**
     * This function used to edit the profile details by customer
     * @param customerData
     * @param user_id
     */
    async editByCustomer(customerData, user_id) {
        customerData.account_id = await (0, appUtils_1.accountId)();
        // Decrypt email and password
        customerData.email.email = await (0, appUtils_1.decryptData)(customerData.email.email);
        if (customerData.email.email) {
            // Existing Email Checking
            const emailExists = await this.emailDao.checkEmailExists({
                email: customerData.email.email,
                customer_id: (0, typeorm_1.Not)(user_id),
            });
            if (emailExists) {
                throw customExceptions_1.default.validationError(this.i18next.t("EMAIL_EXISTS"));
            }
            customerData.id = user_id;
            this.customerDao.save(customerData);
        }
        throw customExceptions_1.default.validationError(this.i18next.t("ENCRYPT_VALUE"));
    }
};
__decorate([
    (0, handlers_decorator_1.Post)("/sign-up"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerService.prototype, "add", null);
__decorate([
    (0, handlers_decorator_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerService.prototype, "get", null);
__decorate([
    (0, handlers_decorator_1.Put)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CustomerService.prototype, "edit", null);
CustomerService = __decorate([
    (0, service_decorator_1.default)("/customers"),
    __metadata("design:paramtypes", [Object, redis_1.LSRedisClient,
        jwtHandler_1.default,
        customer_dao_1.default,
        email_dao_1.default])
], CustomerService);
exports.default = CustomerService;
//# sourceMappingURL=customer.service.js.map