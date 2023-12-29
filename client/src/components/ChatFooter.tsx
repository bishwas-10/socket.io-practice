import React, { FormEvent, useState } from "react";
import { Socket } from "socket.io-client";

export interface ChatMessage {
  message: string;
  username: string;
  id: string;
  socketID: string;
}
const ChatFooter = ({socket}:{socket:Socket})=>{
  const [message, setMessage] = useState<string>("");



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(message.trim() && localStorage.getItem("username")){
      const newMessage:ChatMessage ={
        message: message,
        username: localStorage.getItem("username") as string,
        id: `${socket.id}_${Date.now()}`,
        socketID:socket.id
      }
      socket.emit('message', newMessage);
      
    }
    setMessage('')
  };

  return (
    <div className="bg-[#f4ebcfee] w-full flex flex-row ">
      <form
        onSubmit={handleSubmit}
        action="submit"
        className="w-full flex flex-row"
      >
        <input
          type="text"
          placeholder="write a message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          className="w-full px-2"
        />
        <button type="submit" className="bg-green-800 px-10 py-2 text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
