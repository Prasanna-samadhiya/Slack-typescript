import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

// Define the interface for the Message document
interface IMessage extends mongoose.Document {
    text: string;
    channel: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    createdAt: Date;
}

// Define the Message schema
const MessageSchema = new mongoose.Schema<IMessage>({
    text: {
        type: String,
        required: true,
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Message model
const Message = mongoose.model<IMessage>('Message', MessageSchema);
module.exports = Message;
