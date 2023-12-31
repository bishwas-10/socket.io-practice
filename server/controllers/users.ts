import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, verifyPassword } from "../utils/password";

export const logIn=async(req:Request, res:Response)=>{
   const {email, password}= req.body;
   
    try {
    if(!email || !password){
        return res.status(403).send({status:false, message:"all fields are mandatory"});

    }   
    
    const existingUser = await User.findOne({email});

    if(!existingUser){
        return res.status(403).send({status:false, message:"user doesnt exist"});
    }

    const isPasswordMatched = await verifyPassword(password, existingUser.password as string);

    if(!isPasswordMatched){
        return res.status(403).send({status:false, message:"invalid credentials"});
    }

    



    } catch (error) {
        console.log(error)
    }
}

export const signUp=async(req:Request, res:Response)=>{

    const {email, username, password}= req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(404).send({status:false, message:"user already exists"});
        }
        const hashedPassword = await hashPassword(password);
        const user = await  User.create({username, email, password:hashedPassword});
        await user.save();
        const user2 = user.toObject();
        delete user2.password;
        res.status(203).send({status:true, message:"user signed in successfully"});
    } catch (error) {
        console.log("error signing in ", error);
    }
}

