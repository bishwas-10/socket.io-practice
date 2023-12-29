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
      <div className="relative top-16 w-full md:px-8">
        {/* {message.map((message: ChatMessage, index: number) =>
          message.username === localStorage.getItem("username") ? (
            <div key={index}
            className=" w-[60%] flex flex-col gap-1 p-2 items-end"
            >
              <p>You</p>
              <p className="px-3 py-2 rounded-lg w-max bg-green-400">lorem</p>
            </div>
          ) : (
            <div key={index} className="w-[60%] flex flex-col gap-1 p-2 items-start">
              <p>{message.username}</p>
              <p>{message.message}</p>
            </div>
          )
        )} */}
        <div className=" w-[60%] ml-auto flex flex-col gap-1 p-2  items-end">
          <div className="flex flex-row gap-2 items-center text-gray-600">
           
            <p>You</p>
            <span className="text-xs ">12:30</span>
          </div>
          <p className="px-3 py-2 rounded-lg max-w-full bg-green-400 text-right">
            asndasnd
          </p>
        </div>

        <div className="w-[60%] mr-auto flex flex-col gap-1 p-2 items-start">
        <div className="flex flex-row gap-2 items-baseline text-gray-600">
           
           <p>You</p>
           <span className="text-xs ">12:30</span>
         </div>
          <p className="px-3 py-2 rounded-lg max-w-full bg-red-400">saddsd</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
