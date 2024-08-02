import { Users, prisma } from "../../helpers";
import { AUTH_MESSAGE_CONSTANT } from "../../common/constants";
import { BadRequestError} from "../../common/utils";
interface PaginationParams {
  page: number;
  pageSize: number;
  role?: string;
  search?: string;
}
class UserService {
  async getAllUser(query:any): Promise<any> {
    const { page = 1, pageSize = 10, role, search } = query;
    const paginationParams: PaginationParams = {
      page: Number(page),
      pageSize: Number(pageSize),
      role,
      search,
    };
    console.log(paginationParams, "pagination data");
    try {
      const skip = (paginationParams.page - 1) * paginationParams.pageSize;
      const take = paginationParams.pageSize;
      const where: any = {};
      if (paginationParams.role) {
        where.roleId = paginationParams.role; // Adjust this based on how roles are stored
      }
      if (paginationParams.search) {
        where.OR = [
          { firstName: { contains: paginationParams.search, mode: 'insensitive' } },
          { lastName: { contains: paginationParams.search, mode: 'insensitive' } },
          { email: { contains: paginationParams.search, mode: 'insensitive' } },
          { username: { contains: paginationParams.search, mode: 'insensitive' } },
        ];
      }
      const [users, totalUsers] = await prisma.$transaction([
        Users.findMany({
          skip,
          take,
          select: {
            id: true,
            email: true,
            avatar: true,
            firstName: true,
            lastName: true,
            username: true,
            phone: true,
            status: true,
            roleId: true,
            deleted: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
          },
          where,
        }),
        Users.count({ where }),
      ]);
      if (!users) {
        throw new BadRequestError(AUTH_MESSAGE_CONSTANT.USER_DOESNOT_EXIST);
      }
      return {
        users,
        pagination:{
          totalUsers,
          page: paginationParams.page,
          pageSize: paginationParams.pageSize,
          totalPages: Math.ceil(totalUsers / paginationParams.pageSize)
        }
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      } else {
        throw new BadRequestError('An unexpected error occurred while fetching the users');
      }
    }
    // console.log(query,"pagination data")
    // try {  
    //   const users = await Users.findMany({select:{
    //     id:true,
    //     email:true,
    //     avatar:true,
    //     firstName:true,
    //     lastName:true,
    //     username:true,
    //     phone:true,
    //     status:true,
    //     roleId:true,
    //     deleted:true,
    //     createdAt:true,
    //     updatedAt:true,
    //     deletedAt:true
    //   }})
    //   if (!users) {
    //     throw new BadRequestError(AUTH_MESSAGE_CONSTANT.USER_DOESNOT_EXIST);
    //   }
    //   return users;
    // } catch (error) {
    //   if (error instanceof BadRequestError) {
    //     throw error;
    //   } else {
    //     throw new BadRequestError('An unexpected error occurred while creating the menu');
    //   }
    // }



  }

  async getUser(id: any): Promise<any> {
    try {
      if (!id) throw new BadRequestError("Please provide User Id")
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

  async deleteUser(id:any):Promise<any>{
    if (!id) throw new BadRequestError("Please provide User Id")
    try {
        const user = Users.delete(
          {
            where:{
              id:id
            }
          })
        return user
    } catch (error) {
        
    }
  }
  async updateUser(req:any): Promise<any> {
    const id = req.params.id
    const data = req.body
    if (!id) throw new BadRequestError("Please provide User Id")
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

const userService = new UserService();
export default userService;
