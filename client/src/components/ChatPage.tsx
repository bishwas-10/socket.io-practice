import React, { useState, useEffect, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter, { ChatMessage } from "./ChatFooter";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export interface JoinMessageProps {
  status:boolean,
  messages:{
    message:string
    username:string,
    createdAt:Date | null

  }
}
const ChatPage = ({ socket }: { socket: Socket }) => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state:RootState)=>state.auth.currentUser);
  const [messages, setMessgaes] = useState<ChatMessage[]>([]);
  const [typingResponse, setTypingResponse] = useState<string>("");
  const [typingStatus, setTypingStatus] = useState<boolean>(false);
  const [joinMessage, setJoinMessage]= useState<JoinMessageProps>({status:false, messages:{
    message:"",
    username:"",
    createdAt:null
  }})
  const lastMessageRef = useRef(null);
  useEffect(() => {
    socket.on("message_response", (data) => {
   
       setMessgaes((messages) => [...messages, data]) 
    }
     
    );
    socket.on("typing_response", (data) => {
      setTypingStatus(true);
      setTypingResponse(data);
      
    });
    socket.on('join_room',(data)=>{
     
      setJoinMessage({status:true, messages:{
        message:data.message,
        username:data.username,
        createdAt:data.createdAt
      }});
    })
    return () => {
      socket.off("message_response");
      socket.off("typing_response");
      socket.off("join_room");
    };
  }, [socket]);

  useEffect(()=>{
    if(loggedUser===null){
      navigate("/auth");
    }
  },[])
  return (
    <div className="fixed top-0 flex flex-row w-screen h-screen max-h-screen bg-[#f5eabdee] overflow-hidden">
      <ChatBar socket={socket}/>
      <div className="flex flex-col w-[70%] h-full">
        <div className="h-[88%]  ">
          <ChatBody
          socket={socket}
            message={messages}
            typingStatus={typingStatus}
            typingResponse={typingResponse}
            joinMessage={joinMessage}
            lastMessageRef={lastMessageRef}
          />
        </div>
        <div className="h-[12%]  fixed bottom-0  w-[70%] border-2 bg-[#f4ebcfee] ">
          <ChatFooter setTypingStatus={setTypingStatus} socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
