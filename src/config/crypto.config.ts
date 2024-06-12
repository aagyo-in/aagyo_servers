import { registerAs } from "@nestjs/config";

export const CRYPTO_CONFIG = registerAs("CRYPTO", () => {
  return {
    SECRET: process.env["OTP_SECRET_KEY"],
  };
});
