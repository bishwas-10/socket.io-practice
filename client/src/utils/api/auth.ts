import axios from "axios";
import { FormDataProps } from "../../components/AuthPage";


const instance = axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials:true,
});


export const userLogin=async(formData:FormDataProps)=>{
    try {
        const {data} = await instance.post('/users/login', formData);
        console.log(data);
        return data;
    } catch (error:any) {
        console.log("Error logging in", error.response?.data );
    }
}

export const userSignUp=async(formData:FormDataProps)=>{
    try {
        const data = await instance.post('/users/signup', formData);
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error Signing up", error);
    }
}