import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { RootState } from '../store/store'

type Users={
  username:string,
  room:string,
  socketId:string
}
const ChatBar = ({socket}:{socket:Socket}) => {
  const loggedUser = useSelector((state:RootState)=> state.auth.currentUser);
  const username = loggedUser?.username;
const [activeUsers, setActiveUsers]=useState<Users[]>()
console.log(activeUsers);
useEffect(()=>{
  socket.on('users',(data:Users[])=>{
    setActiveUsers(data)
  })

  return ()=>{
    socket.off('users')
  }
},[])
  return (
    <div className=" p-4 w-[30%] bg-[#bba666ee]">
      <p className="text-center text-2xl  font-bold">ChatBar</p>
      <div className="mt-10">
      <p className=" text-xl  font-bold">Active Users</p>
      <div className="flex flex-col mt-4">
      <ul className="text-lg flex flex-col gap-2 text-green-900 font-medium">
      {
        activeUsers?.map((user,index)=>{
          return(
            <li key={index}>{username===user.username ?"You": user.username}</li>
          )
        })
      }
      </ul>
      </div>
      </div>
    </div>
  )
}

export default ChatBar