import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import createSecretToken from "./createSecretToken";
import "dotenv/config";
import User from "../models/user";
const refresh = async (req: Request, res: Response) => {
  const cookie = req.cookies.auth_token;
  if (!cookie)
    return res
      .status(401)
      .send({ status: false, message: "you are not authorized" });

  jwt.verify(
    cookie,
    process.env.REFRESH_TOKEN_KEY as string,
    { complete: true },
    async(error: jwt.VerifyErrors | null, user: JwtPayload | undefined) => {
        if(error) return res.status(403).send({status:false, message:"you are forbidden"});
        
        if(user){
          const userId = user.payload.id
            
            const userExists = await User.findOne({userId});
            const userDetail = {
              _id: userExists?._id,
              username: userExists?.username,
              email: userExists?.email,
            };
            const accessToken = createSecretToken(userId);
           return res.status(200).send({status:true,message:"",userDetail,accessToken});
        }
    }
  );
};

export default refresh;