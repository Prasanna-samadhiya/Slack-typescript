//exploring type from express for app
import { Application } from "express"
//importing websocket
import WebSocket, { Server as WebSocketServer } from 'ws';

const express=require("express")
//requiring different routers
const Messagerouter=require("./Routes/MessageRoute")
const Userrouter=require("./Routes/UserRoute")
const Channelrouter=require("./Routes/ChannelRoute")
const Inviterouter=require("./Routes/InviteRoutes")
const Genrouter=require("./Routes/GenchatRoute")
const Penrouter=require("./Routes/PenchatRoute")
const Authrouter=require("./Routes/OauthRoute")

const dotenv=require("dotenv")
const cors=require("cors")

const cookieParser=require("cookie-parser")
const DBconnect = require("./Config/Config")

const http=require('http')
const app: Application = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server:server });

dotenv.config()

app.use(cors({
  origin : ["http://localhost:5173"],
  credentials : true
}))

app.use(express.json())
app.use(cookieParser())

//using the database connection fuction
DBconnect()

app.use("/user",Userrouter)
app.use("/channel",Channelrouter)
app.use("/invite",Inviterouter)
app.use("/gchat",Genrouter)
app.use("/pchat",Penrouter)
app.use("/oauth",Authrouter)
app.use("/message",Messagerouter(wss))

//starting the websocket connection
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