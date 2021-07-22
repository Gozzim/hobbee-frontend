import socketIOClient from "socket.io-client";

//TODO: make this not hardcoded
const io = socketIOClient("http://localhost:4000/");

export { io };
