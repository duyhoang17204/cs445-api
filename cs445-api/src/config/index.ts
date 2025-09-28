import path from "path";

const isBuildServer = __dirname.indexOf("build/src") > -1;

const extraPath = isBuildServer ? "../" : "";

const ENV_FILE: any = {
  development: extraPath + "../../.env.development",
  production: extraPath + "../../.env.production",
  staging: extraPath + "../../.env.staging",
  test: extraPath + "../../.env.test",
};

const JWT = {
  JWT_ENCRYPTION: "jwt-sct",
  JWT_EXPIRATION: 864000,
};

// common env
require("dotenv").config({
  path: path.resolve(__dirname, extraPath + "../../.env"),
});

// special env
require("dotenv").config({
  path: path.resolve(
    __dirname,
    ENV_FILE[process.env.NODE_ENV || "development"]
  ),
});

const defaults = {
  ROOT: path.join(__dirname, ".."),
  PATH_MODELS: path.join(__dirname, "../modules"),
  ADMIN_PATH: "/admin",
  DATABASE: {
    DATABASE_URL:
      process.env.DATABASE_URL || "mongodb://localhost:27017/staging",
    DATABASE_NAME: process.env.DATABASE_NAME || "staging",
  },
};

// const ONEPAY = {
//   SECURE_SECRET: "6D0870CDE5F24F34F3915FB0045120DB",
//   vpc_Merchant: "TESTONEPAY",
//   vpc_AccessCode: "6BEB2546",
//   vpc_ReturnURL: `${process.env.CLIENT_URL}/payment/success`,
//   vpc_Version: "2",
//   vpc_Command: "pay",
//   vpcURL: "https://mtf.onepay.vn/onecomm-pay",
//   AgainLink: `${process.env.CLIENT_URL}/payment`,
//   vpc_User: "op01",
//   vpc_Password: "op123456",
// };

const config = {
  JWT,

  ...defaults,
};

export default config;
