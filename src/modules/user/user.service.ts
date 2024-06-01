import { Users } from "../../helpers";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constants";
import { BadRequestError} from "../../common/utils";
class UserService {
  async getAllUser(): Promise<any> {
    try {  
      const users = await Users.findMany()
      if (!users) {
        throw new BadRequestError(AUTH_MESSAGE_CONSTANT.UNABLE_TO_CREATE_USER);
      }
      return users;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      } else {
        throw new BadRequestError('An unexpected error occurred while creating the menu');
      }
    }
  }

  async getUserById(id: any): Promise<any> {
    try {
        const user = await Users.findUnique({
            where:{
                id:id
            }
        })
        return user;
        
    } catch (error) {
       throw new Error('Server error occured.')
    }
  }

  async deleteUserById(id:any):Promise<any>{
    try {
        const user = Users.delete(id)
        return user
    } catch (error) {
        
    }
  }
  async updateUser(id: any, data: any): Promise<any> {
    try {
      const user = await Users.update({
        where: { id: id },
        data: data,
      });
      return user;
    } catch (error) {
      throw new Error('Server error occurred.');
    }
  }

  async updateUserRole(id: any, role: any): Promise<any> {
    try {
      const user = await Users.update({
        where: { id: id },
        data: { role: role },
      });
      return user;
    } catch (error) {
      throw new Error('Server error occurred.');
    }
  }
}

const menuService = new UserService();
export default menuService;
