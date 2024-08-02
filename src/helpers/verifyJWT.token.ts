import jwt, { JwtPayload } from "jsonwebtoken";
export default async function verifyJwtToken(
    token : string,
    SECRET_KEY : string,
   ): Promise<any> {
   const decoded =  jwt.verify(token, SECRET_KEY) as JwtPayload
   return decoded
  }