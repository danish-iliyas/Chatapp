import http from "http";
import { Server } from "socket.io";
import express from "express";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
 
io.on("connection", (socket) => {
    console.log("a user connected");
 
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
 
export {app, server, io};