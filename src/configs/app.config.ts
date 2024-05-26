import { dotEnv as env } from "../common/utils";

export default {
  appConfig: {
    PORT: env.PORT,
    APP_URL: env.APP_URL,
    NODE_ENV: env.NODE_ENV, 
    APP_NAME: env.APP_NAME,

  },
  dbConfig: {
    DATABASE_URL: env.DATABASE_URL
  },
  jwtConfig:{
    JWT_SECRET_ACCESSTOKEN_KEY:env.JWT_SECRET_ACCESSTOKEN_KEY,
    JWT_SECRET_REFRESHTOKEN_KEY:env.JWT_SECRET_REFRESHTOKEN_KEY,
    JWT_SECRET_RESET_PIN_KEY:env.JWT_SECRET_RESET_PIN_KEY
  },
  mailConfig:{
    MAILING_USER:env.MAILING_USER,
    MAILING_PASS:env.MAILING_PASS,
  }
};
