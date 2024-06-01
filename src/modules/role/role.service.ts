import { Role } from "../../helpers";
import { BadRequestError } from "../../common/utils";
import { ROLE_MESSAGE_CONSTANT } from "src/common/constants";


class RoleService {
    // Create a new role
    async create(reqBody: any): Promise<any> {
      try {
        const role = await Role.create({
          data: { ...reqBody },
          select: {
            id: true,
          }
        });
        if (!role) {
          throw new BadRequestError(ROLE_MESSAGE_CONSTANT.UNABLE_TO_CREATE_ROLE);
        }
        return role;
      } catch (error) {
        if (error instanceof BadRequestError) {
          throw error;
        } else {
          throw new BadRequestError('An unexpected error occurred while creating the role');
        }
      }
    }
  
    // Retrieve a role by ID
    async getRoleById(roleId: string): Promise<any> {
      console.log(roleId, "roleId")
      try {
        const role = await Role.findUnique({
          where: { id: roleId },
        });
        if (!role) {
          throw new BadRequestError(ROLE_MESSAGE_CONSTANT.ROLE_NOT_FOUND);
        }
        return role;
      } catch (error) {
        throw new BadRequestError('An unexpected error occurred while retrieving the role');
      }
    }
  
    // Retrieve all roles
    async getAllRoles(): Promise<any[]> {
      try {
        const roles = await Role.findMany();
        console.log(roles,'roles')
        return roles;
      } catch (error) {
        throw new BadRequestError('An unexpected error occurred while retrieving roles');
      }
    }
  
    // Update a role
    async update(roleId: string, updateData: any): Promise<any> {
      try {
        const updatedRole = await Role.update({
          where: { id: roleId },
          data: { ...updateData },
        });
        if (!updatedRole) {
          throw new BadRequestError(ROLE_MESSAGE_CONSTANT.UNABLE_TO_UPDATE_ROLE);
        }
        return updatedRole;
      } catch (error) {
        throw new BadRequestError('An unexpected error occurred while updating the role');
      }
    }
  
    // Delete a role
    async delete(roleId: string): Promise<any> {
      try {
        const deletedRole = await Role.delete({
          where: { id: roleId },
        });
        if (!deletedRole) {
          throw new BadRequestError(ROLE_MESSAGE_CONSTANT.UNABLE_TO_DELETE_ROLE);
        }
        return deletedRole;
      } catch (error) {
        throw new BadRequestError('An unexpected error occurred while deleting the role');
      }
    }
  }
  
  const roleService = new RoleService();
  export default roleService;
  