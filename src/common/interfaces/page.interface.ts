export interface IPageCreate {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
  }