import jwt, { Secret, JwtPayload, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Users } from "../helpers";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, ".env") });
export const SECRET_KEY: Secret = `${process.env.JWT_SECRET_ACCESSTOKEN_KEY}`; 
export const jwtTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  console.log('hello')
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
  } catch(error ) {
    if (error instanceof JsonWebTokenError){
      return res.json("Invalid token.")
    } else if (error instanceof TokenExpiredError){
      return res.json("Token expired.")
    } else if ( error instanceof Error && error.message === "Token missing") {
      return res.json("Token missing.");
    } else if(error instanceof Error && error.message === "User is deleted."){
      return res.json("User is deleted.")
    } else return res.status(500).json("Internal server error.")
  }
};