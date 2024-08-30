import express, { Application, Request, Response } from 'express';
import http from 'http';
import WebSocket from 'ws';
import mongoose from 'mongoose';
import Message from '../Modals/Messages/MessageModal'; // Import your Message model
import Gchat from "../Modals/GeneralChats/generalchatsmodal";
import Pchat from "../Modals/PrivateChats/privatechatsmodal";
import { ErrorHandler } from '../Utilities/utilites';

const app: Application = express();



// Controller to create a new message
// const createMessage = (wss: WebSocket.Server) => async (req: Request, res: Response) => {
//   try {
//     const { sender, receiver, content, isDM ,isPrivate} = req.body;

//     // Validate request data
//     if (!sender || !receiver || !content) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

    
//     // Create and save the new message
//     const message = new Message({
//       sender,
//       receiver,
//       content,
//       isDM,
//       isPrivate
//     });

//     const savedMessage = await message.save();
    
//     // Broadcast the new message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ type: 'newMessage', data: savedMessage }));
//       }
//     });

//     res.status(201).json(savedMessage);
//   } catch (error:any) {
//     console.error('Error creating message:', error);
//     res.status(500).json({ error: 'Failed to create message' });
//   }
// };


const createMessage = (wss: WebSocket.Server) => async (req: Request, res: Response) => {
    try {
      const { sender, content,chatname} = req.body;
      const genchat=await Gchat.findOne({name:chatname})
      
      if(!genchat){
        const penchat=await Pchat.findOne({name:chatname})
        console.log("penchat",penchat)
        if(!penchat){
          return ErrorHandler(res,"Sender not found",401);
        }
        penchat.messages.push({sender:sender,avatar:"",content:content})
        penchat.save();
        return res.status(201).json({success:true,penchat})
      }
      genchat.messages.push({sender:sender,avatar:"",content:content})
      genchat.save();
      
      // Validate request data
      if (!sender || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      
      
      // Broadcast the new message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'newMessage', data: content }));
        }
      });
  
      res.status(201).json(genchat);
    } catch (error:any) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  };

// Controller to fetch messages
const fetchMessages = async (req: Request, res: Response) => {
  try {
    const { receiverId, isDM } = req.query;

    if (!receiverId) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }

    const messages = await Message.find({
      receiver: receiverId,
      isDM: isDM === 'true', // Convert string to boolean
    }).sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const deleteMessage = (wss: WebSocket.Server)=>async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    // Find and delete the message
    const result = await Message.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Broadcast the deletion to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'deleteMessage', data: { id } }));
      }
    });

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

const Getspecificchat = async(req:Request,res:Response)=>{
    
    try {
      const {chatname} = req.body;
      console.log(chatname)
      const genchat=await Gchat.findOne({name:chatname})
      
      if(!genchat){
        const penchat=await Pchat.findOne({name:chatname})
        if(!penchat){
          return ErrorHandler(res,"Sender not found",401);
        }
        return res.status(201).json({success:true,chat:penchat})
      }
      // Validate request data
      if (!chatname) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      res.status(201).json({success:true,chat:genchat});
    } catch (error:any) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
}

module.exports={fetchMessages,createMessage ,deleteMessage,Getspecificchat}