import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import { SuccessCreatedResponse } from "src/common/utils";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignup } from "src/common/interfaces";
import { catchAsyncHandler } from "src/helpers";

export class userController {
  async getAllUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const users = await userService.getAllUser();
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, users).sendResponse(res);
  }
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await userService.getUserById(req.params);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
  async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await userService.getUserById(req.params);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
  async updateUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await userService.getUserById(req.params);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
  async updateUserRoleById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await userService.getUserById(req.params);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
} 

export default {
    getAllUser: catchAsyncHandler(new userController().getAllUser),
    getUserById: catchAsyncHandler(new userController().getUserById),
    updateUserById: catchAsyncHandler(new userController().updateUserById),
    deleteUserById: catchAsyncHandler(new userController().deleteUserById),
    updateUserRoleById: catchAsyncHandler(new userController().updateUserRoleById),
};
