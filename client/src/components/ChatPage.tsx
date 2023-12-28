import React from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = () => {
  return (
    <div className="flex flex-row w-screen min-h-screen bg-[#e5c564ee]">
      <ChatBar/>
      <div className="flex flex-col w-full">
        <div className="h-[88%]   "><ChatBody/></div>
        <div className="h-[12%]  m-8 border-2 bg-[#f4ebcfee] p-4"><ChatFooter/></div>
      </div>
    </div>
  )
}

export default ChatPage