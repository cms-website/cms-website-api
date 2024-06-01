import { NextFunction, Request, Response } from "express";
 
import roleService from "./role.service";
import { SuccessCreatedResponse } from "src/common/utils";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignup } from "src/common/interfaces";
import { catchAsyncHandler } from "src/helpers";

export class roleController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log(req.body, "dfdf")
    const user = await roleService.create(req.body);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
  async getRole(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log(req.params,"req")
    const user = await roleService.getRoleById(req.params.id);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }

  async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const roles = await roleService.getAllRoles();
    return new SuccessCreatedResponse<any>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, roles).sendResponse(res);
  }

  
  async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user = await roleService.delete(req.params.id);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const {id } = req.params
    const data = req.body
    const role = await roleService.update(id, data);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, role).sendResponse(res);
  }
  async updateRole(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const {id } = req.params
    const data = req.body
    const role = await roleService.update(id, data);
    return new SuccessCreatedResponse<IAuthSignup>(AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, role).sendResponse(res);
  }
}

export default {
  create: catchAsyncHandler(new roleController().create),
  getRole: catchAsyncHandler(new roleController().getRole),
  getAllRoles: catchAsyncHandler(new roleController().getAllRoles),
  delete: catchAsyncHandler(new roleController().delete),
  update: catchAsyncHandler(new roleController().update),
  updateRole: catchAsyncHandler(new roleController().updateRole)
};
