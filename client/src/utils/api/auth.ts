import axios from "axios";
import { FormDataProps } from "../../components/AuthPage";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});
export const getUser = async (token: string) => {
  try {
    const { data } = await instance.get("/users", {
      headers: { Accept: "application/json", authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log("error getting user", error);
  }
};

export const userLogin = async (formData: FormDataProps) => {
  try {
    const { data } = await instance.post("/users/login", formData);
    console.log(data);
    return data;
  } catch (error: any) {
   console.log(error.response.data);
   return error.response.data;
  }
};

export const userSignUp = async (formData: FormDataProps) => {
  try {
    const data = await instance.post("/users/signup", formData);
    console.log(data);
    return data;
  } catch (error:any) {
    console.log(error.response.data)
    return error.response.data;
  }
};

export const userLogOut = async () => {
  try {
    const {data} = await instance.get("/users/signout");
    return data;
  
  } catch (error) {
    console.log("Error Signing out", error);
  }
};