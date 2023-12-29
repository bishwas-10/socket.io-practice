import React from "react";
import { ChatMessage } from "./ChatFooter";

const ChatBody = ({ message }: { message: ChatMessage[] }) => {
  console.log(message);
  return (
    <div className="">
      <div className="px-2 fixed w-full h-16 flex flex-row gap-4 items-center border-2 bg-[#fcd9baee]">
        <p className="text-xl capitalize">Daddy's fastest swimmer's talk</p>
        <button
          type="button"
          className="p-2 border-2 rounded-lg bg-[#ff4b4bee] border-[#e5c564ee]"
        >
          Leave Chat
        </button>
      </div>
      <div className="relative top-16">
        {message.map((message: ChatMessage, index: number) =>
          message.username === localStorage.getItem("username") ? (
            <div key={index}
            className=""
            >
              <p>{message.username}</p>
              <p>{message.message}</p>
            </div>
          ) : (
            <div key={index}>
              <p>You</p>
              <p>{message.message}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChatBody;
