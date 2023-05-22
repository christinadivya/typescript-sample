"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validation_1 = require("express-validation");
const i18nextConfig_1 = __importDefault(require("../../config/i18nextConfig"));
const string = express_validation_1.Joi.string();
const number = express_validation_1.Joi.number();
const emailValidation = {
    add: {
        body: express_validation_1.Joi.object({
            email: string
                .email()
                .required()
                .messages({
                "string.pattern.base": i18nextConfig_1.default.t("INVALID_EMAIL"),
                "any.required": i18nextConfig_1.default.t("EMAIL_REQUIRED"),
            }),
            is_primary: express_validation_1.Joi.number().valid(1, 0).required(),
        }),
    },
};
const phoneValidation = {
    add: {
        body: express_validation_1.Joi.object({
            phone: string
                .min(10)
                .max(10)
                .pattern(/^[\d]*$/)
                .required()
                .messages({
                "string.pattern.base": i18nextConfig_1.default.t("INVALID_PHONE"),
                "any.required": i18nextConfig_1.default.t("PHONE_REQUIRED"),
                "string.max": i18nextConfig_1.default.t("MIN_MAX_CHARACTER_10"),
                "string.min": i18nextConfig_1.default.t("MIN_MAX_CHARACTER_10"),
            }),
            is_primary: express_validation_1.Joi.number().required(),
        }),
    },
};
const zipCodeValidation = {
    add: {
        body: express_validation_1.Joi.object({
            zipcode_id: number.required().messages({
                "any.required": i18nextConfig_1.default.t("ZIPCODE_REQUIRED"),
            }),
        }),
    },
};
const providerValidation = {
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
            display_name: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("DISPLAY_NAME_REQUIRED"),
            }),
            invoice_name: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("INVOICE_NAME_REQUIRED"),
            }),
            business: express_validation_1.Joi.object({
                business_name: string
                    .trim()
                    .required()
                    .messages({
                    "any.required": i18nextConfig_1.default.t("businessNameRequired"),
                }),
            }),
            status: string.valid("Pending", "Active", "Paused", "Archived").messages({
                "string.empty": i18nextConfig_1.default.t("STATUS_REQUIRED"),
                "string.any": i18nextConfig_1.default.t("invalidStatus"),
            }),
            emails: express_validation_1.Joi.array()
                .min(1)
                .max(5)
                .items(emailValidation.add.body)
                .required()
                .messages({
                "string.empty": i18nextConfig_1.default.t("EMAIL_REQUIRED"),
            }),
            phone_numbers: express_validation_1.Joi.array()
                .min(1)
                .max(5)
                .items(phoneValidation.add.body)
                .required()
                .messages({
                "string.empty": i18nextConfig_1.default.t("PHONE_REQUIRED"),
            }),
            provider_zipcodes: express_validation_1.Joi.array()
                .min(1)
                .items(zipCodeValidation.add.body)
                .required()
                .messages({
                "string.empty": i18nextConfig_1.default.t("ZIPCODE_REQUIRED"),
            }),
        }),
    },
    signup: {
        body: express_validation_1.Joi.object({
            account_id: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("ACCOUNT_ID_REQUIRED"),
            }),
            email: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("EMAIL_REQUIRED"),
            }),
            password: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("passwordRequired"),
            }),
        }),
    },
    login: {
        body: express_validation_1.Joi.object({
            email: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("EMAIL_REQUIRED"),
            }),
            password: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("passwordRequired"),
            }),
        }),
    },
    changePassword: {
        body: express_validation_1.Joi.object({
            old_password: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("passwordRequired"),
            }),
            new_password: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("passwordRequired"),
            }),
        }),
    },
    forgotPasswordRequest: {
        body: express_validation_1.Joi.object({
            email: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("EMAIL_REQUIRED"),
            }),
        }),
    },
    forgotPasswordOTPVerification: {
        body: express_validation_1.Joi.object({
            otp_code: number.required().messages({
                "any.required": i18nextConfig_1.default.t("OTP_REQUIRED"),
            }),
        }),
    },
    forgotPasswordUpdate: {
        body: express_validation_1.Joi.object({
            user_id: number.required().messages({
                "any.required": i18nextConfig_1.default.t("OTP_REQUIRED"),
            }),
            password: string
                .trim()
                .required()
                .messages({
                "any.required": i18nextConfig_1.default.t("passwordRequired"),
            }),
        }),
    },
};
exports.default = {
    providerValidation,
};
//# sourceMappingURL=provider.validation.js.map