const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origins:"http://localhost:300",
        methods:["GET","POST"],
    }
})

io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data.room);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });
    
      socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });
})


server.listen(3001,()=>{
    console.log("Server is running")
})