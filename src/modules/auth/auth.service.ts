import { BcryptHelper, Users } from "../../helpers";
import { signupValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constants";
import { IUser, IAuthSignupPayload, IAuthSignup } from "../../common/interfaces";
import { BadRequestError, ConflictRequestError, sanitizeFields } from "../../common/utils";
import * as jwt from "jsonwebtoken";
import { env } from "src/configs";

class AuthService {
  async signup(reqBody: IAuthSignupPayload): Promise<IAuthSignup> {
    const { error, value } = signupValidation(reqBody);
    if (error) throw new BadRequestError(error.details[0].message);

    if (value.password !== value.confirmPassword) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED);
    let userExits = await this.findUserByUnique({ email: value.email });
    if (userExits) throw new ConflictRequestError(AUTH_MESSAGE_CONSTANT.EMAIL_ALREADY_TAKEN);

    const sanitizeUser = sanitizeFields<IAuthSignupPayload>(value, ["confirmPassword"]);
    const hashPassword = await new BcryptHelper().generateHashPassword(sanitizeUser.password);

    const user = await Users.create({
      data: { ...sanitizeUser, password: hashPassword },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });
    if (!user) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER);

    return user;
  }

  private async findUserByUnique(query: { [key: string]: string }): Promise<IUser | null> {
    return Users.findUnique({ where: query });
  }

  async login(reqBody:any):Promise<any>{
    console.log(reqBody)
    const user = await Users.findUnique({
      where:{
        email:reqBody.email
      }
    })
  if(!user) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.USER_DOESNOT_EXIST)

  const isPasswordValid = await new BcryptHelper().verifyPassword(reqBody.password, user.password)

  if(!isPasswordValid) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.INVALID_CREDENTIALS)

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(tokenPayload, env.jwtConfig.JWT_SECRET_KEY, {expiresIn: "1h"})
    return {
      token, user
    }

  }
}

const authService = new AuthService();
export default authService;
