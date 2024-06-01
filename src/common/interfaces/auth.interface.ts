export interface IAuthSignupPayload {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  roleId: string;
  password: string;
  confirmPassword?: string;
}

export interface IAuthSignup {
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
