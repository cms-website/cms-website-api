import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Users } from "src/helpers";
import * as dotenv from "dotenv";
import path from "path";
import { BadRequestError } from "src/common/utils";
dotenv.config({ path: path.join(__dirname, ".env") });
export const SECRET_KEY: Secret = `${process.env.JWT_SECRET_KEY}`; 
export const jwtTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token)  throw new Error("Token missing");

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const id: any = decoded.id;
    const userProfile = await Users.findUnique({
      where: {
        id: id
      }
    });

    if(userProfile?.deleted) throw new Error("User is deleted")
    next();

  } catch (error ) {
    if ( error instanceof Error && error.message === "Token missing") {
      return res.json("Token missing");
    }else if(error instanceof Error && error.message === "User is deleted"){
      return res.json("User is deleted")
    }
     throw new BadRequestError("Token is Expired")
  }
};
