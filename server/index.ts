import express from "express";

import http from "http"

import cors from "cors";
const app = express();
app.use(cors()); // Add cors middleware

const server = http.createServer(app);

server.listen(4000, () => console.log("server listening on port 4000"));