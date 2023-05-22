import { Joi } from "express-validation";
import i18next from "../../config/i18nextConfig";

const string = Joi.string();
const number = Joi.number();

const emailValidation = {
  add: {
    body: Joi.object({
      email: string
        .email()
        .required()
        .messages({
          "string.pattern.base": i18next.t("INVALID_EMAIL"),
          "any.required": i18next.t("EMAIL_REQUIRED"),
        }),
      is_primary: Joi.number().valid(1, 0).required(),
    }),
  },
};

const phoneValidation = {
  add: {
    body: Joi.object({
      phone: string
        .min(10)
        .max(10)
        .pattern(/^[\d]*$/)
        .required()
        .messages({
          "string.pattern.base": i18next.t("INVALID_PHONE"),
          "any.required": i18next.t("PHONE_REQUIRED"),
          "string.max": i18next.t("MIN_MAX_CHARACTER_10"),
          "string.min": i18next.t("MIN_MAX_CHARACTER_10"),
        }),
      is_primary: Joi.number().required(),
    }),
  },
};

const zipCodeValidation = {
  add: {
    body: Joi.object({
      zipcode_id: number.required().messages({
        "any.required": i18next.t("ZIPCODE_REQUIRED"),
      }),
    }),
  },
};

const providerValidation = {
  register: {
    body: Joi.object({
      first_name: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("FIRST_NAME_REQUIRED"),
        }),
      last_name: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("LAST_NAME_REQUIRED"),
        }),
      display_name: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("DISPLAY_NAME_REQUIRED"),
        }),
      invoice_name: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("INVOICE_NAME_REQUIRED"),
        }),
      business: Joi.object({
        business_name: string
          .trim()
          .required()
          .messages({
            "any.required": i18next.t("businessNameRequired"),
          }),
      }),
      status: string.valid("Pending", "Active", "Paused", "Archived").messages({
        "string.empty": i18next.t("STATUS_REQUIRED"),
        "string.any": i18next.t("invalidStatus"),
      }),
      emails: Joi.array()
        .min(1)
        .max(5)
        .items(emailValidation.add.body)
        .required()
        .messages({
          "string.empty": i18next.t("EMAIL_REQUIRED"),
        }),
      phone_numbers: Joi.array()
        .min(1)
        .max(5)
        .items(phoneValidation.add.body)
        .required()
        .messages({
          "string.empty": i18next.t("PHONE_REQUIRED"),
        }),
      provider_zipcodes: Joi.array()
        .min(1)
        .items(zipCodeValidation.add.body)
        .required()
        .messages({
          "string.empty": i18next.t("ZIPCODE_REQUIRED"),
        }),
    }),
  },
  signup: {
    body: Joi.object({
      account_id: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("ACCOUNT_ID_REQUIRED"),
        }),
      email: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("EMAIL_REQUIRED"),
        }),
      password: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("passwordRequired"),
        }),
    }),
  },
  login: {
    body: Joi.object({
      email: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("EMAIL_REQUIRED"),
        }),
      password: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("passwordRequired"),
        }),
    }),
  },
  changePassword: {
    body: Joi.object({
      old_password: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("passwordRequired"),
        }),
      new_password: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("passwordRequired"),
        }),
    }),
  },
  forgotPasswordRequest: {
    body: Joi.object({
      email: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("EMAIL_REQUIRED"),
        }),
    }),
  },
  forgotPasswordOTPVerification: {
    body: Joi.object({
      otp_code: number.required().messages({
        "any.required": i18next.t("OTP_REQUIRED"),
      }),
    }),
  },
  forgotPasswordUpdate: {
    body: Joi.object({
      user_id: number.required().messages({
        "any.required": i18next.t("OTP_REQUIRED"),
      }),
      password: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("passwordRequired"),
        }),
    }),
  },
};
export default {
  providerValidation,
};
