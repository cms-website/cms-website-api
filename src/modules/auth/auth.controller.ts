import { NextFunction, Request, Response } from "express";
 
import authService from "./auth.service";
import { SuccessCreatedResponse } from "src/common/utils";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignup } from "src/common/interfaces";
import { catchAsyncHandler } from "src/helpers";

export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await authService.signup(req.body);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await authService.login(req.body);
    console.log(user,"user")
    res.cookie('accessToken',user.accessToken,{
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000
    })
    res.cookie('refreshToken',user.refreshToken,{
      httpOnly: true, 
      secure: true,
      maxAge: 75 * 60 * 1000
    })
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }


  async logout(req:Request, res:Response, next: NextFunction) : Promise<Response>{
    const email = await authService.logout(req.query)
    return email
  }

  async forgetPassword(req:Request, res:Response, next: NextFunction) : Promise<Response>{
    const data = await authService.forgetPassword(req.body)
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, data).sendResponse(res);
  }
  async resetPassword(req:Request, res:Response, next: NextFunction) : Promise<Response>{
    const data = await authService.resetPassword(req.body)
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, data).sendResponse(res);

  }
}

export default {
  signup: catchAsyncHandler(new AuthController().signup),
  login: catchAsyncHandler(new AuthController().login),
  logout: catchAsyncHandler(new AuthController().logout),
  forgetPassword: catchAsyncHandler(new AuthController().forgetPassword),
  resetPassword: catchAsyncHandler(new AuthController().resetPassword),
};
