 import {Menu } from "../../helpers";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constants";
import { BadRequestError} from "../../common/utils";

class MenuService {

  async create(reqBody: any): Promise<any> {
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
        console.error('Unexpected error:', error);
        throw new BadRequestError('An unexpected error occurred while creating the menu');
      }
    }
  }

  async getMenu(menuType: any): Promise<any> {
    const allMenus = await Menu.findMany(); 

    const groupedMenus: Record<string, any[]> = {};
    allMenus.forEach((menu :any) => {
      const parentId = menu.parentId || 'root'; 
      if (!groupedMenus[parentId]) {
        groupedMenus[parentId] = [];
      }
      groupedMenus[parentId].push(menu);
    });
  
    const formatMenu = (parentId: string | null): any[] => {
      const submenus = groupedMenus[parentId || 'root'] || [];
      return submenus.map(menu => ({
        id: menu.id,
        systemName: menu.systemName,
        displayName: menu.displayName,
        link: menu.link,
        order: menu.order,
        type: menu.type,
        parentId: menu.parentId,
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
        children: formatMenu(menu.id) 
      }));
    };
  
    return formatMenu(null);
  }
}

const menuService = new MenuService();
export default menuService;
