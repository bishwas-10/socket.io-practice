import React, { useState, useEffect, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter, { ChatMessage } from "./ChatFooter";
import { Socket } from "socket.io-client";
const ChatPage = ({ socket }: { socket: Socket }) => {
  const [messages, setMessgaes] = useState<ChatMessage[]>([]);
  const [typingResponse, setTypingResponse] = useState<string>("");
  const [typingStatus, setTypingStatus] = useState<boolean>(false);
  const lastMessageRef = useRef(null);
  useEffect(() => {
    socket.on("message_response", (data) =>
      setMessgaes((messages) => [...messages, data])
    );
    socket.on("typing_response", (data) => {
      setTypingStatus(true);
      setTypingResponse(data);
      
    });
    return () => {
      socket.off("message_response");
      socket.off("typing_response");
    };
  }, [socket]);

  return (
    <div className="flex flex-row w-screen h-screen max-h-screen bg-[#e5c564ee] overflow-hidden">
      <ChatBar />
      <div className="flex flex-col w-[70%] h-full">
        <div className="h-[88%]  ">
          <ChatBody
            message={messages}
            typingStatus={typingStatus}
            typingResponse={typingResponse}
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
