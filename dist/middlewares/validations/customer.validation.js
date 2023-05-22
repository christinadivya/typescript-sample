"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validation_1 = require("express-validation");
const i18nextConfig_1 = __importDefault(require("../../config/i18nextConfig"));
const string = express_validation_1.Joi.string();
const customerValidation = {
    register: {
        body: express_validation_1.Joi.object({
            first_name: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("FIRST_NAME_REQUIRED"),
            }),
            last_name: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("LAST_NAME_REQUIRED"),
            }),
            email: express_validation_1.Joi.object({
                email: string
                    .trim()
                    .required()
                    .messages({
                    "any.required": i18nextConfig_1.default.t("EMAIL_REQUIRED"),
                }),
            }),
            password: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("PASSWORD_REQUIRED"),
            }),
        }),
    },
    edit: {
        body: express_validation_1.Joi.object({
            first_name: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("FIRST_NAME_REQUIRED"),
            }),
            last_name: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("LAST_NAME_REQUIRED"),
            }),
            email: express_validation_1.Joi.object({
                email: string
                    .trim()
                    .required()
                    .messages({
                    "any.required": i18nextConfig_1.default.t("EMAIL_REQUIRED"),
                }),
            }),
        }),
    },
};
exports.default = {
    customerValidation,
};
//# sourceMappingURL=customer.validation.js.map