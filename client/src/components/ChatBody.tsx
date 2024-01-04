import React, { useEffect } from "react";
import { ChatMessage } from "./ChatFooter";
import { useNavigate } from "react-router-dom";
import { JoinMessageProps } from "./ChatPage";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import moment from "moment";

const ChatBody = ({
  message,
  lastMessageRef,
  typingResponse,
  typingStatus,
 socket
}: {
  message: ChatMessage[];
  lastMessageRef: any;
  typingResponse: string;
  typingStatus: boolean;
  joinMessage: JoinMessageProps;
 socket:Socket
}) => {
  const navigate = useNavigate();
 
  const username = localStorage.getItem("username") ;
  const room = useSelector((state:RootState)=>state.room.room);
  const handleLeaveCLick = () => {
   
    if(username && room){
      socket.emit("leave",{username,room, socketId: socket.id})
      localStorage.removeItem("username");
      localStorage.removeItem("room");
    }
   
    navigate("/");
  };


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, typingStatus]);

  useEffect(()=>{
    socket.emit("new_user", { username, room, socketId: socket.id });
    
  },[])
  return (
    <div className="  h-full">
      <div className="px-2 navbar fixed top-0 z-10 w-full h-[12%] flex flex-row gap-4 items-center border-2 bg-[#fcd9baee]">
        <p className="text-xl capitalize">Daddy's fastest swimmer's talk</p>
        <button
          type="button"
          onClick={handleLeaveCLick}
          className="p-2 border-2 rounded-lg bg-[#ff4b4bee] border-[#e5c564ee]"
        >
          Leave Chat
        </button>
      </div>

      <div className="relative top-20 w-full h-[87%] bottom-20  md:px-8 overflow-y-scroll">
        {message?.map((message: ChatMessage, index: number) => {
          if(message.room === room){
             if (message?.justJoined === true) {
            return (
             <div key={index} className="w-full flex justify-center">
               <div  className="flex flex-row gap-2 bg-slate-300 rounded-lg p-2 mt-4">
                <span>
                  {message.username} 👋 :<p className="italic">{message.message}</p>
                </span>
              </div>
             </div>
            );
          }

          return message.username === localStorage.getItem("username") ? (
            <div
              key={index}
              className=" w-[60%] ml-auto flex flex-col gap-1 p-2  items-end"
            >
              <div className="flex flex-row gap-2 items-center text-gray-600">
                <p>You</p>
                <span className="text-xs ">{message.time}</span>
              </div>
              <div className="flex flex-row items-end gap-1">
                <p className="px-3 py-2 rounded-lg max-w-full bg-green-400 text-right">
                  {message.message}
                </p>
                <img
                  className="rounded-full h-6 w-6"
                  src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                  alt="person_image"
                />
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="w-[60%] mr-auto flex flex-col gap-1 p-2 items-start"
            >
              <div className="flex flex-row gap-2 items-baseline text-gray-600">
                <p>{message.username}</p>
                <span className="text-xs ">{message.time}</span>
              </div>
              <div className="flex flex-row-reverse items-end gap-1">
                <p className="px-3 py-2 rounded-lg max-w-full bg-red-400 text-right">
                  {message.message}
                </p>
                <img
                  className="rounded-full h-6 w-6"
                  src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                  alt="person_image"
                />
              </div>
            </div>
          ); 
          }
        
        })}
        {typingStatus ? (
          <div className="w-[60%] mr-auto p-2 items-start">
            <p className="px-3 py-2 rounded-lg max-w-full bg-gray-300 italic text-sm">
              {typingResponse}
            </p>
          </div>
        ) : (
          " "
        )}

        <div ref={lastMessageRef}></div>
      </div>
    </div>
  );
};

export default ChatBody;
