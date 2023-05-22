import CryptoJS from "crypto-js";
import moment from "moment";
import { uuid } from "uuidv4";
import * as envConfig from "../config/env";

const config = envConfig.getConfig();

/**
 * To generate random otp
 * @returns Otp code
 */
export async function otpCode(): Promise<number> {
  return Math.floor(1000 + Math.random() * 9000);
}

/**
 * To generate random account id
 * @returns uuid
 */
export async function accountId(): Promise<string> {
  const accountId = uuid();
  return accountId;
}
/**
 * This function is to decrypt user detail
 * @param encryptedText - encrypted text field
 */
export async function decryptData(encryptedText: string): Promise<string> {
  const bytes = CryptoJS.AES.decrypt(encryptedText, config.encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
/**
 * This function is used to verify the expiry date time
 */
export async function verifyExpiry(expiryDate: Date): Promise<any> {
  const then = moment(expiryDate);
  const timeDiff = moment().diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
  return moment.duration(timeDiff).asMinutes().valueOf();
}

export const cacheDuration = 15000000;
