import Joi from "joi";
import { RoleCreate } from "src/common/interfaces";

export const createRoleValidaton = (data: RoleCreate): Joi.ValidationResult<RoleCreate> => {
  const schema = Joi.object<RoleCreate, true>({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    type: Joi.string().required(),
    permissions: Joi.array().required(),
  });

  return schema.validate(data);
};
