import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { userLogOut } from "../utils/api/auth";
import { signOut } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state: RootState) => state.auth.currentUser);
  const handleSignOut = async () => {
    const data = await userLogOut();
console.log(data)
    if (data.status) {
      dispatch(signOut());
      localStorage.removeItem("persist:token");
      navigate("/auth");
    }
  };
  return (
    <div className="flex flex-row justify-between items-center h-16 px-4">
      <div>
        <span>Welcome</span>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <span>{loggedUser?.username}</span>
        <button onClick={handleSignOut} className="p-2 border-2 bg-gray-300">
          log out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
