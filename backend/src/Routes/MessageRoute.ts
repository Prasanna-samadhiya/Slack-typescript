const express=require("express")
const { fetchMessages ,createMessage,deleteMessage,Getspecificchat} = require("../Controllers/MessageController")
import WebSocket from 'ws';

const router=express.Router()
module.exports = function(wss: WebSocket.Server) {
    // Route to create a new message
    router.post('/createMessage', createMessage(wss));
  
    // Route to fetch messages
    router.get('/fetchMessages', fetchMessages);

    router.delete('/deleteMessage/:id', deleteMessage);

    router.post('/specificchat',Getspecificchat)
  
    return router;
  };