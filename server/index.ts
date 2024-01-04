import express from "express";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";
import cookieParser from "cookie-parser";
require("dotenv").config();
//db connection
import connectDb from "./utils/connectDb";

//routes

import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const app = express();
app.set("trust proxy", 1); 
app.use(
  cors({
    origin: ["http://localhost:3000","https://socket-io-practice.vercel.app/"],
    methods: "GET,POST, PUT, DELETE, PATCH",
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin'],
  })
); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:"https://socket-io-practice.vercel.app/" ,
    methods: "GET,POST, PUT, DELETE, PATCH",
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin'],
  },
});

let users: { username: string; room: string; socketId: string }[] = [];
io.on("connection", (socket) => {
  console.log(`connection established with user ${socket.id}`),
    socket.on("new_user", (data) => {
      console.log(data);
      const userExists = users.some((user) => user.username === data.username);
      
      if (!userExists) {
        users.push({...data,socketId:socket.id});
      } 
        socket.join(data.room);
        socket.to(data.room).emit("message_response", {
          justJoined: true,
          message: `${data.username} has just joined the room`,
          username: "CHAT_BOT",
          id: `${socket.id}_${Date.now()}`,
          socketID: socket.id,
          room: data.room,
        });
      
      io.to(data.room).emit("users", users);
    });
  socket.on("message", (data) => {
    io.to(data.room).emit("message_response", data);
  });

  socket.on("user_typing", (data) => {
    socket.broadcast.to(data.room).emit("typing_response", data.message);
  });

  socket.on("leave", (data) => {
    const disconnectedUser = users.find(
      (user) => user.username === data.username
    );

    if (disconnectedUser) {
      socket.broadcast.to(disconnectedUser.room).emit("message_response", {
        justJoined: true,
        message: `${disconnectedUser.username} has just left the room`,
        username: "CHAT_BOT",
        id: disconnectedUser.socketId,
        socketID: socket.id,
        room: disconnectedUser.room,
      });
      users = users.filter(
        (data) => data.username !== disconnectedUser.username
      );
      io.to(disconnectedUser.room).emit("users", users);
    }
  });
  socket.on("disconnect", () => {
    const disconnectedUser = users.find(
      (data) => data.socketId === socket.id 
    );
    if (disconnectedUser) {
      socket.broadcast.to(disconnectedUser.room).emit("message_response", {
        justJoined: true,
        message: `${disconnectedUser.username} has just left the room`,
        username: "CHAT_BOT",
        id: disconnectedUser.socketId,
        socketID: socket.id,
        room: disconnectedUser.room,
      });
      users = users.filter(
        (data) => data.username !== disconnectedUser.username
      );
      io.to(disconnectedUser.room).emit("users", users);
    }
  });
});

app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/users", authRouter);

app.use("/api/users", userRouter);

//server listening on port 4000

connectDb()
  .then(() => {
    server.listen(4000, () => console.log("server listening on port 4000"));
  })
  .catch((err) => console.log(err));
