
import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

// Define the interface for the Channel document
interface IChannel extends mongoose.Document {
    name: string;
    description?: string;
    members: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}

// Define the Channel schema
const ChannelSchema = new mongoose.Schema<IChannel>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Channel model
const Channel = mongoose.model<IChannel>('Channel', ChannelSchema);
module.exports = Channel;
