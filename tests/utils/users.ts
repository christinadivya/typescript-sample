import moment from "moment";
import { IUserData, UserStatusEnum } from "../../src/interfaces/entity/IUser";
import { ISuccessMessage } from "../../src/interfaces/response/IResponse";

const user: IUserData = {
  id: 1,
  account_id: "0aa1db04-661e-41ec-9c5b-13b184c6059b",
  first_name: "Test",
  last_name: "User",
  display_name: "Test user",
  invoice_name: "Test user",
  created_by: 1,
  business: {
    business_name: "test",
  },
  emails: [
    {
      email: "skbyte131@gmail.com",
      is_primary: 1,
      email_type_id: 1,
    },
  ],
  phone_numbers: [
    {
      phone: "22222232222",
      is_primary: 1,
      is_verified: 1,
      phone_type_id: 3,
    },
  ],
};

const userProvider = {
  id: 1,
  account_id: "0aa1db04-661e-41ec-9c5b-13b184c6059b",
  first_name: "Test",
  last_name: "User",
  display_name: "Test user",
  invoice_name: "Test user",
  status: UserStatusEnum.pending,
};

const signupData = {
  account_id: "0aa1db04-661e-41ec-9c5b-13b184c6059b",
  email: "U2FsdGVkX1/bGmS7G+2ZlN5y/iL0sMea6o9Fsx7Q8O4=",
  password: "U2FsdGVkX18YHLCniPcKddHt2i6o1oNyoB7lnjJKN84=",
};

const loginData = {
  email: "U2FsdGVkX1/bGmS7G+2ZlN5y/iL0sMea6o9Fsx7Q8O4=",
  password: "U2FsdGVkX19UWSraNRAoXpXxMXnJ/ptCZgfDLHz33ZU=",
};

const changepasswordData = {
  user_id: 1,
  old_password: "U2FsdGVkX19UWSraNRAoXpXxMXnJ/ptCZgfDLHz33ZU=",
  new_password: "U2FsdGVkX1/Z1UgNdTf97KFXplcY8LBQkBs9uQo+YZs=",
};

const emailData = {
  email: "U2FsdGVkX1/bGmS7G+2ZlN5y/iL0sMea6o9Fsx7Q8O4=",
};

const resetPassword = {
  email: "U2FsdGVkX1/bGmS7G+2ZlN5y/iL0sMea6o9Fsx7Q8O4=",
  otp_code: 1234,
  password: "U2FsdGVkX18YHLCniPcKddHt2i6o1oNyoB7lnjJKN84=",
  user_id: 1,
};
const id = 1;
const account_id = "0aa1db04-661e-41ec-9c5b-13b184c6059b";
const customerLisParam = {
  limit: 5,
  page: 1,
  search: "",
};

export const updateAchieveUser: ISuccessMessage = {
  message: "Status Updated Successfully",
};

export const otp_created_at = moment().format("YYY-MM-DD hh:mm:ss");
export const total = 5;

const data: IUserData = {
  id: 1,
  account_id: "0aa1db04-661e-41ec-9c5b-13b184c6059b",
  first_name: "Test",
  last_name: "User",
  display_name: "Test user",
  invoice_name: "Test user",
  business: {
    business_name: "test",
  },
  emails: [
    {
      email: "test@gmail.com",
      is_primary: 1,
      email_type_id: 1,
      user_id: 1,
    },
  ],
  phone_numbers: [
    {
      is_primary: 1,
      is_verified: 1,
      phone_type_id: 3,
      user_id: 1,
    },
  ],
  password: "$2b$10$uakobAG.NVKGyJSCYjHXZuq9yuvlLvWyh09JAmY.qfoGybrFHFpQy",
  status: UserStatusEnum.pending,
};

export {
  user,
  resetPassword,
  emailData,
  changepasswordData,
  loginData,
  signupData,
  userProvider,
  id,
  account_id,
  customerLisParam,
  data,
};
