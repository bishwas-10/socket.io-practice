import React,{useEffect} from 'react';
import { io } from 'socket.io-client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ChatPage from './components/ChatPage';
import Home from './components/Home';

const socket = io('http://localhost:4000')
function App() {

  return (
   <Router>
    <Routes>
    <Route path='/' element={<Home socket={socket}/>}/>
    <Route path='/chat' element={<ChatPage socket={socket}/>}/>

    </Routes>
   </Router>
  );
}

export default App;
