import { NextFunction, Request, Response } from "express";
 
import menuService from "./menu.service";
import { SuccessCreatedResponse } from "src/common/utils";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignup } from "src/common/interfaces";
import { catchAsyncHandler } from "src/helpers";

export class menuController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log(req.body, "dfdf")
    const user = await menuService.create(req.body);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
  async getMenu(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await menuService.getMenu(req.query.type);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
} 

export default {
  create: catchAsyncHandler(new menuController().create),
  getMenu: catchAsyncHandler(new menuController().getMenu)
};
