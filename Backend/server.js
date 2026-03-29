import express from "express"
import http from "http";
import {Server} from 'socket.io';
import cors from "cors";
const app=express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chat-application-et4d.vercel.app"
  ],
  methods: ["GET", "POST"]
}));

app.get("/", (req, res) => {
  res.send("this is the server , which is live");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-application-et4d.vercel.app"
    ],
    methods: ["GET", "POST"]
  }
});


io.on("connection",(socket)=>{
    console.log("a user connected:",socket.id);

socket.on("join_room",(room)=>{
    socket.join(room);

    console.log(`user ${socket.id} has joined room ${room}`);
})

socket.on("send_message",(data)=>{
    console.log("message from the client",data);
    io.to(data.room).emit("receive_message",data);
})




socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id);
})



})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("server live on port", PORT);
});
