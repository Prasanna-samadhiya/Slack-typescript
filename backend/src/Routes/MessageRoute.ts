const express=require("express")
const { fetchMessages ,createMessage,deleteMessage} = require("../Controllers/MessageController")
import { Server } from 'socket.io';

const router=express.Router()
module.exports = function(io:Server) {
    // Route to create a new message
    router.post('/createMessage', createMessage(io));
  
    // Route to fetch messages
    router.get('/fetchMessages', fetchMessages);

    router.delete('/deleteMessage/:id', deleteMessage);
  
    return router;
  };