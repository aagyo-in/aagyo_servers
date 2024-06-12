import * as crypto from "crypto";
import { CRYPTO_CONFIG } from "src/config/crypto.config";

const secretKey = "your_secret_key";

export function generateOTP() {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); // Convert the number to a string
}

export function createToken(otp: any) {
  const hmac = crypto.createHmac("sha256", CRYPTO_CONFIG().SECRET);
  hmac.update(otp);
  return hmac.digest("hex");
}

export function validateOTP(otp: any, userToken: any) {
  const token = createToken(otp);
  return token === userToken;
}

export function generateUniqueNumber() {
  const timestamp = new Date().getTime();
  const uniqueIdentifier = Math.floor(Math.random() * 100000);
  return `${timestamp}${uniqueIdentifier}`;
}
