import React,{useEffect} from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');
function App() {
const userData = {
  name:"bishwas",
  section:"pmc sec A"
}
const joinRoom=()=>{
  socket.emit('join_room',userData);
}

  useEffect(()=>{
    joinRoom();
  },[])

  return (
   <div className="text-red-400">hello scoket.io</div>
  );
}

export default App;
