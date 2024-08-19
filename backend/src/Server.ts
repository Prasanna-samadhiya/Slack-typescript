import { Application } from "express"
import WebSocket, { Server as WebSocketServer } from 'ws';

const express=require("express")
const Messagerouter=require("./Routes/MessageRoute")
const Userrouter=require("./Routes/UserRoute")
const Channelrouter=require("./Routes/ChannelRoute")
const Inviterouter=require("./Routes/InviteRoutes")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const http=require('http')
const cookieParser=require("cookie-parser")
const DBconnect = require("./Config/Config")

const app: Application = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
dotenv.config()
app.use(express.json())
app.use(cookieParser())
DBconnect()
app.use("/user",Userrouter)
app.use("/channel",Channelrouter)
app.use("/invite",Inviterouter)
app.use("/message",Messagerouter(wss))

wss.on('connection', (ws) => {
    console.log('A user connected');
  
    // Handle incoming messages from clients
    ws.on('message', (message) => {
      console.log('Received:', message);
    });
  
    ws.on('close', () => {
      console.log('A user disconnected');
    });
  });

app.listen(process.env.PORT,()=>{
    console.log('listening to 5000')
})