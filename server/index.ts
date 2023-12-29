import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket)=>{
    console.log(`connection established with user ${socket.id}`),
  //  socket.on("join_room",(data)=>{
  //   const {name,section } = data;
  //   socket.join(section);
   
  //   let created_time = new Date();
  //   socket.to(section).emit('receive_message',{
  //       message:`${name} has just joined the room `,
  //       username:name,
  //       created_time   
  //   });
   
  //  }) 
   socket.on('message',(data)=>{
    io.emit('message_response',data);
  })
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

server.listen(4000, () => console.log("server listening on port 4000"));
