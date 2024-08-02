import {Menu } from "../../helpers";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constants";
import { BadRequestError} from "../../common/utils";
class PageService {
  async create(reqBody: any): Promise<any> {
    console.log(reqBody, "page create data")
    try {  
      const menu = await Menu.create({
        data: {...reqBody},
        select: {
          id: true,
        }
      });
      if (!menu) {
        throw new BadRequestError(AUTH_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER);
      }
      return menu;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      } else {
        throw new BadRequestError('An unexpected error occurred while creating the menu');
      }
    }
  }

}

const pageService = new PageService();
export default pageService;
