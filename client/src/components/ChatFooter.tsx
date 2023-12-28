import React from 'react'

const ChatFooter = () => {
  return (
    <div className="bg-[#f4ebcfee] w-full flex flex-row ">
      <input type="text" placeholder="write a message" className="w-full px-2" />
      <button className="bg-green-800 px-10 py-2 text-white">Send</button>
    </div>
  )
}

export default ChatFooter