import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
const Home = ({socket}:{socket:Socket}) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("JavaScript");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('username',name);
    localStorage.setItem('room',room);
   
    socket.emit('new_user',{name,room, socketId:socket.id});
    navigate('/chat');
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  };
  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col items-center justify-center text-white">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="py-6 px-4 w-96   rounded-sm bg-gray-800 flex flex-col gap-4"
      >
        <p className="text-center text-2xl">Welcome to Simple Chat App</p>

        <div className="flex flex-col items-center gap-4 text-black">
          <div className="flex gap-4 items-center">
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <input
              type="text"
              minLength={6}
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="username"
              placeholder="your-username"
              className="p-2  focus:outline-none"
            />
          </div>

          <select
            value={room}
            
            onChange={handleSelectChange}
            name="room"
            id="chatroom"
            className="w-40 focus:outline-none"
          >
            <option value="JavaScript" >JavaScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Php">Php</option>
          </select>
          <button
            type="submit"
            className=" w-20 text-white border-2 p-2 border-gray-500 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
