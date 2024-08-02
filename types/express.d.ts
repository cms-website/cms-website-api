import { UserProfile } from "../src/middlewares ";

declare module "express-serve-static-core" {
  interface Request {
    userProfile?: UserProfile;
  }
}
