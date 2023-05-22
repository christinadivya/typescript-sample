import { expect, should } from "chai";
import CryptoJS from "crypto-js";
import moment from "moment";
import sinon from "sinon";
import request from "supertest";
import MailService from "../../src/services/mail.service";
import { userDetail } from "../helpers/user";
import { getHost, setupEnvironment } from "../utils";

const host = getHost("api");
const providerRoute = request(`${host}/providers`);
const userRoute = request(`${host}/users`);
const newUserDetail = userDetail.newUser;
let account_id: string;
let userEmail: string;
let userToken: string;

const mailService = new MailService();
const sandbox = sinon.createSandbox();
sandbox.stub(mailService, "sendMail").resolves();

describe("User", async function userTest() {
  before(async function beforeFn() {
    await setupEnvironment();
  });

  // TODO: need to work on this
  after(async function afterFn() {
    // await restoreEnvironment();
  });

  describe("POST /provider", function createProviderFn() {
    it("Create provider and send invite link via email by super admin user", async () => {
      const response = await providerRoute.post("/").send(newUserDetail);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a("object");
      should().exist(response.body.result);
      expect(response.body.result).to.be.a("object");
      should().exist(response.body.result.message);
      should().exist(response.body.result.account_id);
      expect(response.body.result.message).to.be.a("string");
      expect(response.body.result.account_id).to.be.a("string");
      account_id = response.body.result.account_id;
      userEmail = response.body.result.email;
    });
  });

  describe("POST /provider", function createProviderFn() {
    it("Create provider - Incorrect data (Existing email)", async () => {
      const response = await providerRoute.post("/").send(newUserDetail);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /provider", function createProviderFn() {
    it("Create provider - Incorrect data (Existing phone number)", async () => {
      newUserDetail.emails[0].email = `test${moment()
        .valueOf()
        .toString()}@yopmail.com`;
      newUserDetail.emails[1].email = `test${moment()
        .valueOf()
        .toString()}@gmail.com`;
      const response = await providerRoute.post("/").send(newUserDetail);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /provider", function createProviderFn() {
    it("Create provider - Incorrect data (Existing business name)", async () => {
      newUserDetail.phone_numbers[0].phone = "1122334455";
      newUserDetail.phone_numbers[1].phone = "5544332211";
      const response = await providerRoute.post("/").send(newUserDetail);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /provider", function createProviderFn() {
    it("Create provider - Incorrect data (Existing zipcode)", async () => {
      newUserDetail.business.business_name = "another business name";
      const response = await providerRoute.post("/").send(newUserDetail);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /activation", function createProviderFn() {
    it("Provider activate their account using registered email and password", async () => {
      const activationData = {
        account_id,
        email: CryptoJS.AES.encrypt(
          userEmail,
          userDetail.encryptionKey
        ).toString(),
        password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await providerRoute
        .post("/activation")
        .send(activationData);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a("object");
      should().exist(response.body.result);
      expect(response.body.result).to.be.a("object");
      should().exist(response.body.result.message);
      expect(response.body.result.message).to.be.a("string");
    });
  });

  describe("POST /activation", function createProviderFn() {
    it("Provider activate their account - Incorrect data (Invalid email)", async () => {
      const activationData = {
        account_id,
        email: CryptoJS.AES.encrypt(
          newUserDetail.emails[1].email,
          userDetail.encryptionKey
        ).toString(),
        password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await providerRoute
        .post("/activation")
        .send(activationData);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /activation", function createProviderFn() {
    it("Provider activate their account - Incorrect data (Invalid account id)", async () => {
      const activationData = {
        account_id: `${account_id}123`,
        email: CryptoJS.AES.encrypt(
          newUserDetail.emails[1].email,
          userDetail.encryptionKey
        ).toString(),
        password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await providerRoute
        .post("/activation")
        .send(activationData);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /login", function createProviderFn() {
    it("Login using encrypted credentials", async () => {
      const loginData = {
        email: CryptoJS.AES.encrypt(
          userEmail,
          userDetail.encryptionKey
        ).toString(),
        password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await providerRoute.post("/login").send(loginData);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a("object");
      should().exist(response.body.result);
      expect(response.body.result).to.be.a("object");
      should().exist(response.body.result.id);
      expect(response.body.result.id).to.be.a("number");
      should().exist(response.body.result.account_id);
      expect(response.body.result.account_id).to.be.a("string");
      should().exist(response.body.result.first_name);
      expect(response.body.result.first_name).to.be.a("string");
      should().exist(response.body.result.last_name);
      expect(response.body.result.last_name).to.be.a("string");
      should().exist(response.body.result.business_id);
      expect(response.body.result.business_id).to.be.a("number");
      should().exist(response.body.result.token);
      expect(response.body.result.token).to.be.a("string");
      userToken = response.body.result.token;
    });
  });

  describe("POST /login", function createProviderFn() {
    it("Login using encrypted credentials - Incorrect data (Non primary email)", async () => {
      const loginData = {
        email: CryptoJS.AES.encrypt(
          newUserDetail.emails[1].email,
          userDetail.encryptionKey
        ).toString(),
        password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await providerRoute.post("/login").send(loginData);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /login", function createProviderFn() {
    it("Login using encrypted credentials - Incorrect data (Invalid email)", async () => {
      const loginData = {
        email: CryptoJS.AES.encrypt(
          `${userEmail}Invalid email`,
          userDetail.encryptionKey
        ).toString(),
        password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await providerRoute.post("/login").send(loginData);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /login", function createProviderFn() {
    it("Login using encrypted credentials - Incorrect data (Invalid password)", async () => {
      const loginData = {
        email: CryptoJS.AES.encrypt(
          userEmail,
          userDetail.encryptionKey
        ).toString(),
        password: CryptoJS.AES.encrypt(
          `${userDetail.password}incorrect password`,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await providerRoute.post("/login").send(loginData);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /change-password", function createProviderFn() {
    it("Change password after login", async () => {
      const changePasswordData = {
        old_password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
        new_password: CryptoJS.AES.encrypt(
          userDetail.anotherPassword,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await userRoute
        .post("/change-password")
        .set("Authorization", userToken)
        .send(changePasswordData);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a("object");
      should().exist(response.body.result);
      expect(response.body.result).to.be.a("object");
      should().exist(response.body.result.message);
      expect(response.body.result.message).to.be.a("string");
    });
  });

  describe("POST /change-password", function createProviderFn() {
    it("Change password after login - Incorrect data (old and new password are same)", async () => {
      const changePasswordData = {
        old_password: CryptoJS.AES.encrypt(
          userDetail.anotherPassword,
          userDetail.encryptionKey
        ).toString(),
        new_password: CryptoJS.AES.encrypt(
          userDetail.anotherPassword,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await userRoute
        .post("/change-password")
        .set("Authorization", userToken)
        .send(changePasswordData);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /change-password", function createProviderFn() {
    it("Change password after login - Incorrect data (Incorrect old password)", async () => {
      const changePasswordData = {
        old_password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
        new_password: CryptoJS.AES.encrypt(
          userDetail.anotherPassword,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await userRoute
        .post("/change-password")
        .set("Authorization", userToken)
        .send(changePasswordData);
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /change-password", function createProviderFn() {
    it("Change password after login - Incorrect data (Auth error)", async () => {
      const changePasswordData = {
        old_password: CryptoJS.AES.encrypt(
          userDetail.anotherPassword,
          userDetail.encryptionKey
        ).toString(),
        new_password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      };
      const response = await userRoute
        .post("/change-password")
        .send(changePasswordData);
      expect(response.status).to.eql(401);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /forgot-password-request", function createProviderFn() {
    it("Request OTP to reset new password", async () => {
      const response = await userRoute.post("/forgot-password-request").send({
        email: CryptoJS.AES.encrypt(
          userEmail,
          userDetail.encryptionKey
        ).toString(),
      });
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a("object");
      should().exist(response.body.result);
      expect(response.body.result).to.be.a("object");
      should().exist(response.body.result.message);
      expect(response.body.result.message).to.be.a("string");
    });
  });

  describe("POST /forgot-password-request", function createProviderFn() {
    it("Request OTP to reset new password - Incorrect data (Invalid email)", async () => {
      const response = await userRoute.post("/forgot-password-request").send({
        email: CryptoJS.AES.encrypt(
          `${userEmail}Invalid email`,
          userDetail.encryptionKey
        ).toString(),
      });
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /forgot-password-otp-verification", function createProviderFn() {
    it("OTP verification before updating new password - Incorrect data (Invalid OTP)", async () => {
      const response = await userRoute
        .post("/forgot-password-otp-verification")
        .send({
          otp_code: 1234,
        });
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });

  describe("POST /forgot-password-update", function createProviderFn() {
    it("Update new password - Incorrect data (Invalid id)", async () => {
      const response = await userRoute.post("/forgot-password-update").send({
        user_id: 1234,
        password: CryptoJS.AES.encrypt(
          userDetail.password,
          userDetail.encryptionKey
        ).toString(),
      });
      expect(response.status).to.eql(400);
      expect(response.body).to.be.a("object");
      should().exist(response.body.error);
      expect(response.body.error).to.be.a("object");
      should().exist(response.body.error.message);
      should().exist(response.body.error.errorCode);
      expect(response.body.error.message).to.be.a("string");
      expect(response.body.error.errorCode).to.be.a("number");
    });
  });
});
