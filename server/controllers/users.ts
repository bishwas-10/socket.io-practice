import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, verifyPassword } from "../utils/password";
import createSecretToken from "../utils/createSecretToken";
import jwt from "jsonwebtoken";
import createRefreshToken from "../utils/createRefreshToken";
export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(403)
        .send({ status: false, message: "all fields are mandatory" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(403)
        .send({ status: false, message: "user doesnt exist" });
    }

    const isPasswordMatched = await verifyPassword(
      password,
      existingUser.password as string
    );

    if (!isPasswordMatched) {
      return res
        .status(403)
        .send({ status: false, message: "invalid credentials" });
    }
    const token = createSecretToken(existingUser._id);
    
    const refreshToken = createRefreshToken(existingUser._id);
    const user = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };
    const expiryDate = new Date(Date.now() + 3600000); //1hour

    res
      .cookie("refresh_token", refreshToken, {
        expires: expiryDate,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ status: true, message: "user logged in successfully", user,token });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .send({ status: false, message: "user already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const user2 = user.toObject();
    delete user2.password;
    res
      .status(203)
      .send({ status: true, message: "user signed in successfully" });
  } catch (error) {
    console.log("error signing in ", error);
  }
};
