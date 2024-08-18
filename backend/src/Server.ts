import { Socket } from "socket.io"

const express=require("express")
const app=express()
const Messagerouter=require("./Routes/MessageRoute")
const Userrouter=require("./Routes/UserRoute")
const Channelrouter=require("./Routes/ChannelRoute")
const Inviterouter=require("./Routes/InviteRoutes")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const { Server }=require('socket.io');
const http=require('http')
const cookieParser=require("cookie-parser")
const DBconnect = require("./Config/Config")
const server = http.createServer(app);
const io = new Server(server);
dotenv.config()
app.use(express.json())
app.use(cookieParser())
DBconnect()
app.use("/user",Userrouter)
app.use("/channel",Channelrouter)
app.use("/invite",Inviterouter)
app.use("/message",Messagerouter(io))

io.on('connection', (socket:Socket) => {
    console.log('A user connected');
  
    // Join a room for DM or channel messaging
    socket.on('joinRoom', (roomId:string) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

app.listen(process.env.PORT,()=>{
    console.log('listening to 5000')
})