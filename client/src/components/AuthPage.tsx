import React,{useState, useEffect} from 'react'
import { userLogin, userSignUp } from '../utils/api/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export interface FormDataProps {
    username?:string;
    email:string;
    password:string;
    confirmPassword?:string;
}

interface ErrorProps{
    status:boolean,
    message:string
}
const AuthPage = () => {
    const [formData, setFormData]= useState<FormDataProps>({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [isSignedUp, setIsSignedUp]= useState<boolean>(true);
    const [error, setError]= useState<ErrorProps>({
        status:false,
        message:""
    })
    const dispatch = useDispatch();
const navigate = useNavigate();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        // if(formData.password!== formData.confirmPassword){
        //     setError({
        //         status:true,
        //         message:"Passwords do not match"
        //     })
        //     return;
        // }else if(formData.password.length< 8 ){
        //     setError({
        //         status:true,
        //         message:"Password must be at least 8 characters long"
        //     })
        //     return;
        // }else if(!/[a-z]/.test(formData.password) ){
        //     setError({
        //         status:true,
        //         message:"Password must contain a lowercase letter"
        //     })
        //     return;
        // }else if(!/[A-Z]/.test(formData.password)){
        //     setError({
        //         status:true,
        //         message:"Password must contain an uppercase letter"
        //     })
        //     return;
        // }else if(!/\d/.test(formData.password)){
        //     setError({
        //         status:true,
        //         message:"Password must contain a digit"
        //     })
        //     return;
        // }else if(!/\W|_/.test(formData.password)){
        //     setError({
        //         status:true,
        //         message:"Password must contain a symbol"
        //     })
        //     return;
        // }else{

        // }
        if(!isSignedUp){
            const signedUp =await userSignUp(formData);
            setIsSignedUp(!isSignedUp);
            setFormData({
                email:"",
                password:""
            })
        }else{
            const loggedIn = await userLogin(formData);
            if(loggedIn.status){
                dispatch(signInSuccess(loggedIn));
                navigate('/');
            }
        }
    }
    const handleClick=()=>{
        setIsSignedUp(!isSignedUp);
    }

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-sm h-content bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isSignedUp ? "Sign in" : "Sign up"}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isSignedUp && (
          <div className="flex flex-row gap-2">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                username
              </label>
              <input
                type="text"
                name="username"
                className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
                placeholder=" username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
           
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
            placeholder="Enter your lastname"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isSignedUp && (
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="mb-6 w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          {isSignedUp ? "Sign in" : "Sign up"}
        </button>
      
        {/* <GoogleLogin onSuccess={login as any}/> */}

        <div className="flex flex-row gap-2 justify-center align-center">
          <p>
            {isSignedUp
              ? "Didn't have an account?"
              : "Already have an account?"}
          </p>
          <button
            className="outline-none text-blue-600"
            onClick={handleClick}
          >
            {isSignedUp ? "Sign up" : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AuthPage