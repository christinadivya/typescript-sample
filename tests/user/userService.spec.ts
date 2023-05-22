import { expect, should } from "chai";
import { describe, it } from "mocha";
import sinon, { assert } from "sinon";
import * as envConfig from "../../src/config/env";
import i18nextConfig from "../../src/config/i18nextConfig";
import EmailDao from "../../src/daos/email.dao";
import PhoneNumberDao from "../../src/daos/phone.dao";
import ProviderDao from "../../src/daos/provider.dao";
import ProviderZipcodeDao from "../../src/daos/providerZipcode.dao";
import UserDao from "../../src/daos/user.dao";
import UserBusinessDetailDao from "../../src/daos/userBusinessDetail.dao";
import JwtHandler from "../../src/helpers/jwtHandler";
import { LSRedisClient } from "../../src/redis/redis";
import MailService from "../../src/services/mail.service";
import ProviderService from "../../src/services/provider.service";
import UserService from "../../src/services/user.service";
import {
  changepasswordData,
  data,
  emailData,
  loginData,
  resetPassword,
  signupData,
} from "../utils/users";

const mailService = new MailService(envConfig.getConfig().smtp);
const redisClient = new LSRedisClient(envConfig.getConfig().redisDb);
const jwtHandler = new JwtHandler(
  redisClient,
  envConfig.getConfig().jwtKey,
  i18nextConfig
);
const providerDao = new ProviderDao();
const emailDao = new EmailDao();
const phoneDao = new PhoneNumberDao();
const businessDao = new UserBusinessDetailDao();
const zipcodeDao = new ProviderZipcodeDao();
const userDao = new UserDao(i18nextConfig, jwtHandler, redisClient);
const providerService = new ProviderService(
  i18nextConfig,
  redisClient,
  jwtHandler,
  mailService,
  zipcodeDao,
  userDao,
  providerDao,
  emailDao,
  phoneDao,
  businessDao
);
const userService = new UserService(
  i18nextConfig,
  redisClient,
  mailService,
  emailDao,
  userDao
);

const sandbox = sinon.createSandbox();

describe("User Service", () => {
  const updateCommonMethod = sandbox
    .stub(userDao, "update")
    .resolves();
  const getUserData = sandbox.stub(userDao, "getUserData").resolves(data);
  const emailExists = sandbox
    .stub(emailDao, "checkEmailExistsInArray")
    .resolves([]);
  const emailExist = sandbox
    .stub(emailDao, "checkEmailExists")
    .resolves(data.emails[0]);
  const phoneExists = sandbox
    .stub(phoneDao, "checkPhoneNumberExistsInArray")
    .resolves([]);
  const zipCodeExists = sandbox
    .stub(zipcodeDao, "checkZipCodeExistsInArray")
    .resolves([]);
  const businessNameExists = sandbox
    .stub(businessDao, "getUserBusinessData")
    .resolves();
  const saveBusinessName = sandbox
    .stub(businessDao, "saveBusiness")
    .resolves(data.business);
  const createProviderDao = sandbox.stub(userDao, "saveUser").resolves();
  describe("create provider", function () {
    this.timeout(7000);
    it("should send invite link to user and return user details", async () => {
      const result = await providerService.createProvider(data);
      expect(result).to.be.a("object");
      expect(result.account_id).to.be.a("string");
      expect(result.email).to.be.a("string");
      assert.calledOnce(emailExists);
      assert.calledOnce(phoneExists);
      assert.calledOnce(zipCodeExists);
      assert.calledOnce(businessNameExists);
      assert.calledOnce(saveBusinessName);
      assert.calledOnce(createProviderDao);
    });
  });
  describe("Signup provider", function () {
    this.timeout(7000);
    it("should activate their account via link and set new password", async () => {
      const result = await providerService.activateAccount(signupData);
      expect(result).to.be.a("object");
      expect(result.message).to.be.a("string");
    });
  });
  describe("Login as a provider", function () {
    this.timeout(7000);
    it("should login their account using registered email and password", async () => {
      const result = await providerService.login(loginData);
      expect(result).to.be.a("object");
      assert.callOrder(emailExist);
    });
  });
  describe("Change password by logged in user", function () {
    this.timeout(7000);
    it("should change password of the user if that is valid and logged in", async () => {
      const result = await userService.changePassword(changepasswordData);
      expect(result).to.be.a("object");
      should().exist(result.message);
      expect(result.message).to.be.a("string");
      assert.callOrder(getUserData);
    });
  });
  describe("Forgot password - send otp", function () {
    this.timeout(7000);
    it("should send otp to user email while requesting password reset option", async () => {
      const result = await userService.forgotPasswordRequest(emailData);
      expect(result).to.be.a("object");
      should().exist(result.message);
      expect(result.message).to.be.a("string");
    });
  });
  describe("Verify OTP that sent to email while requesting forgot password option", function () {
    this.timeout(7000);
    it("should verify OTP is valid or not", async () => {
      const result = await userService.forgotPasswordOTPVerification(
        resetPassword
      );
      expect(result).to.be.a("object");
      should().exist(result.message);
      expect(result.message).to.be.a("string");
      should().exist(result.id);
      expect(result.id).to.be.a("number");
    });
  });
  describe("Update new password once after verify the OTP value", function () {
    this.timeout(7000);
    it("should update new password after verifying OTP", async () => {
      const result = await userService.forgotPasswordUpdate(resetPassword);
      expect(result).to.be.a("object");
      should().exist(result.message);
      expect(result.message).to.be.a("string");
      assert.callOrder(updateCommonMethod);
    });
  });
});
