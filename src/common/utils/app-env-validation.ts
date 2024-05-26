import Joi from "joi";
import "dotenv/config";

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required().trim().valid("development", "production", "test", "debug"),
  PORT: Joi.number().required(),
  APP_URL: Joi.string().required().trim(),
  APP_NAME: Joi.string().required().trim(),
  DATABASE_URL: Joi.string().required().trim(),
  JWT_SECRET_ACCESSTOKEN_KEY: Joi.string().required().trim(),
  JWT_SECRET_REFRESHTOKEN_KEY: Joi.string().required().trim(),
  MAILING_USER: Joi.string().required().trim(),
  MAILING_PASS: Joi.string().required().trim()
}).unknown();

const { error, value: dotEnv } = envValidationSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export { dotEnv };
