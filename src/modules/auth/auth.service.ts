import { BcryptHelper, Users} from "../../helpers";
import { signupValidation } from "./auth.validation";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constants";
import { IAuthSignupPayload, IAuthSignup } from "../../common/interfaces";
import { BadRequestError, ConflictRequestError, sanitizeFields } from "../../common/utils";
import jwt, {JwtPayload, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { env } from "src/configs";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: env.mailConfig.MAILING_USER,
    pass: env.mailConfig.MAILING_PASS
  }
});

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

   async findUserByUnique(query: { [key: string]: string }): Promise<any | null> {
    return Users.findUnique({ where: query });
  }

  async login(reqBody:any):Promise<any>{
    console.log(reqBody)
    const user = await Users.findUnique({
      where:{
        email:reqBody.email
      },
      include:{
        role: true
      }
    })
    if(!user) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.USER_DOESNOT_EXIST)

    const isPasswordValid = await new BcryptHelper().verifyPassword(reqBody.password, user.password)

    if(!isPasswordValid) throw new BadRequestError(AUTH_MESSAGE_CONSTANT.INVALID_CREDENTIALS)

    const tokenPayload = {
      id: user.id,
      email: user.email,
      password:user.password
    };
    const accessToken = jwt.sign(tokenPayload, env.jwtConfig.JWT_SECRET_ACCESSTOKEN_KEY, {expiresIn: "1h"})
    const refreshToken = jwt.sign(tokenPayload, env.jwtConfig.JWT_SECRET_REFRESHTOKEN_KEY, {expiresIn: "75m"})
    
    return {
      accessToken,refreshToken, user
    }

  }

  async logout(reqQuery: any):Promise<any>{
    return "hello"
  }

  async forgetPassword(email: any):Promise<any>{

    try {
      const user = await Users.findUnique({
        where: {
          email: email
        }
      });
    console.log(user,"user")

      if (!user) {
        throw new BadRequestError("User not found");
      }

      const pin =  new BcryptHelper().generatePin();
      const tokenPayload = {
        userId: user.id,
        pin: pin,
        email: user.email, 
      };
      const token = jwt.sign(tokenPayload, env.jwtConfig.JWT_SECRET_RESET_PIN_KEY, { expiresIn: "5m" });

      const mailOptions = {
        from: `${env.mailConfig.MAILING_USER}`,
        to: `${email}`,
        subject: 'Password Reset PIN',
        text: `Your password reset PIN is ${pin}. It will expire in five minutes.`
      };

      await transporter.sendMail(mailOptions);

      return token;

    } catch (error) {
      throw new BadRequestError('Server error');
    }
  }

  async resetPassword(email:any, otp:any, token:any): Promise<any> {
    try {
      console.log(email, otp,token,"hello")
        const decodedToken: any = jwt.verify(token, env.jwtConfig.JWT_SECRET_RESET_PIN_KEY) as JwtPayload;
        const isValidPin = decodedToken.pin == otp
        console.log(isValidPin,"isvalid")
        return {Message:"validated", isValidPin } 
    } catch (error) {
      if(error instanceof JsonWebTokenError){
        return {error, message:"Invalid token."}
      }
      if(error instanceof TokenExpiredError){
        return {error}
      }
      
    }

     
  }
  async changePassword(email:any, newPassword:any): Promise<any> {
    try{
      const user = await Users.findUnique({ where: { email } });
        if (!user) {
          throw new BadRequestError('User not found');
        }
        const updatePassword = await new  BcryptHelper().generateHashPassword(newPassword)
        await Users.update({
          where: { email: email },
          data: { password: updatePassword },
        });
        return { message: 'Password reset successfully' };
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new BadRequestError('Token expired');
      }
      throw new Error("Server error occured.");
    }
  }
}


const authService = new AuthService();
export default authService;
