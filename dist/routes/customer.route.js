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
const express_1 = require("express");
const express_validation_1 = require("express-validation");
const resHndlr = __importStar(require("../helpers/resHandler"));
const customer_validation_1 = __importDefault(require("../middlewares/validations/customer.validation"));
function customerRoute(authenticator, customerService) {
    const customerRouter = (0, express_1.Router)();
    /**
     *  This Route helps to create the customer data by providers
     */
    customerRouter.post("/sign-up", [
        (0, express_validation_1.validate)(customer_validation_1.default.customerValidation.register, { keyByField: true }, { abortEarly: false }),
    ], async (req, res) => {
        try {
            const result = await customerService.add(req.body);
            resHndlr.sendSuccess(res, result);
        }
        catch (err) {
            resHndlr.sendError(res, err);
        }
    });
    /**
     *  This Route helps to get the customer data by providers
     */
    customerRouter.get("/", [authenticator.authenticateAndAuthorizeToken()], async (req, res) => {
        try {
            const id = Number(req.user.id);
            const result = await customerService.get(id);
            resHndlr.sendSuccess(res, result);
        }
        catch (err) {
            resHndlr.sendError(res, err);
        }
    });
    /**
     * This Route is used to edit the customer details by provider
     */
    customerRouter.put("/", [
        authenticator.authenticateAndAuthorizeToken(),
        (0, express_validation_1.validate)(customer_validation_1.default.customerValidation.edit, { keyByField: true }, { abortEarly: false }),
    ], async (req, res) => {
        try {
            const result = await customerService.edit(req.body, req.user.id);
            resHndlr.sendSuccess(res, result);
        }
        catch (err) {
            resHndlr.sendError(res, err);
        }
    });
    return customerRouter;
}
exports.default = customerRoute;
//# sourceMappingURL=customer.route.js.map