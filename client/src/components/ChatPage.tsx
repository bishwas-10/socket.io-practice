import React,{useState, useEffect} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter, { ChatMessage } from './ChatFooter'
import { Socket } from 'socket.io-client'
const ChatPage = ({socket}:{socket:Socket}) => {
  const [messages, setMessgaes]= useState<ChatMessage[]>([]);

  useEffect(()=>{
    socket.on('message_response', (data)=> setMessgaes([...messages, data]))
  },[socket])
  
  return (
    <div className="flex flex-row w-screen min-h-screen bg-[#e5c564ee]">
      <ChatBar/>
      <div className="flex flex-col w-full">
        <div className="h-[88%]   "><ChatBody message={messages}/></div>
        <div className="h-[12%]  m-8 border-2 bg-[#f4ebcfee] p-4"><ChatFooter socket={socket}/></div>
      </div>
    </div>
  )
}

export default ChatPage