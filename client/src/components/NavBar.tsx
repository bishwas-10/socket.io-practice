import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const NavBar = () => {
    const loggedUser = useSelector((state:RootState)=> state.auth.currentUser)
    console.log(loggedUser)
  return (
    <div className="flex flex-row justify-between items-center h-16 px-4">
        <div>
            <span>Welcome</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <span>{loggedUser?.username}</span>
            <button className="p-2 border-2 bg-gray-300">log out</button>
        </div>
    </div>
  )
}

export default NavBar