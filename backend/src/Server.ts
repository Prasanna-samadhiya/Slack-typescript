//exploring type from express for app
import { Application, Response ,Request} from "express"
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

const dotenv=require("dotenv")
const cors=require("cors")

const cookieParser=require("cookie-parser")
const DBconnect = require("./Config/Config")

const http=require('http')
const app: Application = express();

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



app.get("/",(req:Request,res:Response)=>{
  return res.send("hi");
})

const server=app.listen(process.env.PORT,()=>{
    console.log('listening to 5000')
})

const wss = new WebSocketServer({ server });
const clients = new Set();
//starting the websocket connection
wss.on('connection', (ws) => {
  // Function to broadcast a message to all connected clients
  function broadcast(message:any,sender:any) {
    for (const client of clients) {
      console.log(client,sender==client)
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
  console.log('A user connected');
  clients.add(ws);

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    // Broadcast the message to all connected clients
    broadcast(message,ws);
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});
app.use("/message",Messagerouter(wss))