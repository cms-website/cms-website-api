import jwt from "jsonwebtoken"
export default  async function signInJWTToken( payload:any, SECRET_KEY:string,expirationTime:string): Promise<any> {
    const token = jwt.sign(payload, SECRET_KEY,{expiresIn: expirationTime})
return token
}