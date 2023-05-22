/* eslint-disable import/prefer-default-export */
import moment from "moment";
import * as envConfig from "../../src/config/env";

const config = envConfig.getConfig();

const minm = 1000000000;
const maxm = 9999999999;

export const userDetail = {
  encryptionKey: config.encryptionKey,
  newUser: {
    first_name: "Test",
    last_name: "User",
    display_name: "Test user",
    invoice_name: "Test",
    business: {
      business_name: `test${moment().valueOf().toString()}`,
    },
    provider_zipcodes: [
      {
        zipcode_id: 1,
      },
    ],
    emails: [
      {
        email: `test${moment().valueOf().toString()}@yopmail.com`,
        is_primary: 1,
      },
      {
        email: `test${moment().valueOf().toString()}@gmail.com`,
        is_primary: 0,
      },
    ],
    phone_numbers: [
      {
        phone: `${Math.floor(Math.random() * (maxm - minm + 1)) + minm}`,
        is_primary: 1,
      },
      {
        phone: `${Math.floor(Math.random() * (maxm - minm + 1)) + minm}`,
        is_primary: 0,
      },
    ],
  },
  password: "Test@1234",
  anotherPassword: "Test@12345",
  data: {
    status: "Active",
  },
};
