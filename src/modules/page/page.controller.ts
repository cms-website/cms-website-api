import pageService from "./page.service";
import { SuccessCreatedResponse } from "src/common/utils";
import { Request, NextFunction, Response } from "express";
import { Page_MESSAGE_CONSTANT } from "src/common/constants";
import { catchAsyncHandler } from "src/helpers";


export class pageController
 {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
      console.log(req.body, "dfdf")
      const page = await pageService.create(req.body);
      return new SuccessCreatedResponse(Page_MESSAGE_CONSTANT.Page_CREATED_SUCCESSFULLY, page).sendResponse(res);
    }
  } 

  export default {
  create: catchAsyncHandler(new pageController().create),
};