import React,{useEffect} from 'react';
import { io } from 'socket.io-client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ChatPage from './components/ChatPage';
import Home from './components/Home';

function App() {

  return (
   <Router>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/chat' element={<ChatPage/>}/>

    </Routes>
   </Router>
  );
}

export default App;
