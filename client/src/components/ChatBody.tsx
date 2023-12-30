import React, { useEffect } from "react";
import { ChatMessage } from "./ChatFooter";
import { useNavigate } from "react-router-dom";
import { JoinMessageProps } from "./ChatPage";

const ChatBody = ({
  message,
  lastMessageRef,
  typingResponse,
  typingStatus,
  joinMessage
}: {
  message: ChatMessage[];
  lastMessageRef: any;
  typingResponse: string;
  typingStatus: boolean;
  joinMessage: JoinMessageProps
}) => {
  const navigate = useNavigate();

  const handleLeaveCLick = () => {
    localStorage.removeItem("username");
    navigate("/");
  };
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
console.log(joinMessage)
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, typingStatus]);

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
          

          return message.username === localStorage.getItem("username") ? (
            <div
              key={index}
              className=" w-[60%] ml-auto flex flex-col gap-1 p-2  items-end"
            >
              <div className="flex flex-row gap-2 items-center text-gray-600">
                <p>You</p>
                <span className="text-xs ">{time}</span>
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
                <span className="text-xs ">{time}</span>
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
        {
          joinMessage?.status && (
            <div>
              {joinMessage.messages.message}
            </div>
          )
        }
        <div ref={lastMessageRef}></div>
      </div>
    </div>
  );
};

export default ChatBody;
