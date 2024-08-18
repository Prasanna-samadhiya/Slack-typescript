import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import Message from '../Modals/Messages/MessageModal'; // Import your Message model

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);


// Controller to create a new message
const createMessage = (io: Server) => async (req: Request, res: Response) => {
  try {
    const { sender, receiver, content, isDM } = req.body;

    // Validate request data
    if (!sender || !receiver || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    
    // Create and save the new message
    const message = new Message({
      sender,
      receiver,
      content,
      isDM,
    });

    const savedMessage = await message.save();
    
    // Emit the message to the receiver's room via Socket.IO
    io.to(receiver).emit('receiveMessage', savedMessage);

    res.status(201).json(savedMessage);
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

const deleteMessage = async (req: Request, res: Response) => {
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

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
module.exports={fetchMessages,createMessage ,deleteMessage}