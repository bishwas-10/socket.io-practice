import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../store/store";
import moment from "moment";

export interface ChatMessage {
  message: string;
  username: string;
  id: string;
  socketID: string;
  room:string | null;
  justJoined?:boolean;
  time:string;
}
const ChatFooter = ({socket,setTypingStatus}:{socket:Socket,setTypingStatus:Dispatch<SetStateAction<boolean>>})=>{
  const room = useSelector((state:RootState)=>state.room.room);
  const [message, setMessage] = useState<string>("");

  let time= moment().format(' h:mm a');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(room);
    if(message.trim() && localStorage.getItem("username")){
      const newMessage:ChatMessage ={
        message: message,
        username: localStorage.getItem("username") as string,
        id: `${socket.id}_${Date.now()}`,
        socketID:socket.id,
        room:room,
        time:time,
      }
      socket.emit('message', newMessage);
      
    }
    setMessage('')
  };

  const handleUserTyping=()=>{
    socket.emit('user_typing',{
      room,
      message:`${localStorage.getItem("username")} is typing...`
    })
  }
  const onKeyUp=()=>{
    setTypingStatus(false)
  }
  return (
    <div className="bg-[#f4ebcfee] w-full  flex flex-row items-center">
      <form
        onSubmit={handleSubmit}
        action="submit"
        className=" flex flex-row w-full mx-2"
      >
        <input
          type="text"
          placeholder="write a message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={handleUserTyping}
          onKeyUp={onKeyUp}
          className="w-full px-2"
        />
        <button type="submit" className="bg-green-800  px-10 py-2 text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
