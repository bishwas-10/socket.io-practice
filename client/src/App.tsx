import React,{useEffect} from 'react';
import { io } from 'socket.io-client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ChatPage from './components/ChatPage';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
import NavBar from './components/NavBar';

const socket = io('https://mern-realtimechat-app.onrender.com/')
function App() {

  return (
   <Router>
    <NavBar/>
    <Routes>
    <Route path='/' element={<Home socket={socket}/>}/>
    <Route path='/chat' element={<ChatPage socket={socket}/>}/>
    <Route path='/auth' element={<AuthPage/>}/>
    </Routes>
   </Router>
  );
}

export default App;
