import socketIOClient from "socket.io-client";

const io = socketIOClient("http://localhost:4000/");

export { io };
