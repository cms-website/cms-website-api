import Joi from "joi";
import { IAuthSignupPayload } from "src/common/interfaces";

export const signupValidation = (data: IAuthSignupPayload): Joi.ValidationResult<IAuthSignupPayload> => {
  const schema = Joi.object<IAuthSignupPayload, true>({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string().lowercase().email().trim().required(),
    roleId: Joi.string().required(),    
  });

  return schema.validate(data);
};
