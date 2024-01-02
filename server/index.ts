import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
require("dotenv").config();
//db connection
import connectDb from "./utils/connectDb";

//routes

import authRouter from "./routes/auth";
import userRouter from "./routes/user"


const app = express();

app.use(cors({
  origin:"http://localhost:3000",
  methods: 'GET,POST, PUT, DELETE, PATCH',
  credentials: true,
})); // Add cors middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users: { name: string; room: string; socketId: string }[] = [];
io.on("connection", (socket) => {
  console.log(`connection established with user ${socket.id}`),
 

    socket.on("new_user", (data) => {
      socket.join(data.room);
      socket.to(data.room).emit("message_response", {
        justJoined: true,
        message: `${data.name} has just joined the room`,
        username: "CHAT_BOT",
        id: `${socket.id}_${Date.now()}`,
        socketID: socket.id,
        room: data.room,
      });

      users.push(data);
      io.emit("users", users);
    });
  socket.on("message", (data) => {
    io.emit("message_response", data);
  });

  socket.on("user_typing", (data) => {
    socket.broadcast.emit("typing_response", data);
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));



app.use("/api/users",authRouter,userRouter);
//server listening on port 4000

connectDb().then(()=>{
  server.listen(4000, () => console.log("server listening on port 4000"));
}).catch((err)=>console.log(err));

