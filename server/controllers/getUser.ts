import User from "../models/user"
import { Request,Response } from "express";

const getUser =async(req:Request, res:Response)=>{
    const userId = req.body.userId;
    console.log(userId)
try {
    const userExists = await User.findOne({_id:userId});
    const user = {
        _id: userExists?._id,
        username: userExists?.username,
        email: userExists?.email,
      };
    res.status(200).send({status:true, user})
} catch (error) {
    console.log(error)
}

}

export default getUser;