import { Joi } from "express-validation";
import i18next from "../../config/i18nextConfig";

const string = Joi.string();

const customerValidation = {
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
      email: Joi.object({
        email: string
          .trim()
          .required()
          .messages({
            "any.required": i18next.t("EMAIL_REQUIRED"),
          }),
      }),
      password: string
        .trim()
        .required()
        .messages({
          "any.required": i18next.t("PASSWORD_REQUIRED"),
        }),
    }),
  },
  edit: {
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
      email: Joi.object({
        email: string
          .trim()
          .required()
          .messages({
            "any.required": i18next.t("EMAIL_REQUIRED"),
          }),
      }),
    }),
  },
};

export default {
  customerValidation,
};
