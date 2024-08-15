import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

// Define the interface for the Thread document
interface IThread extends mongoose.Document {
    name: string;
    description: string;
    messages: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

// Define the Thread schema
const ThreadSchema = new mongoose.Schema<IThread>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, { timestamps: true });

// Create and export the Thread model
const Thread = mongoose.model<IThread>('Thread', ThreadSchema);
module.exports = Thread;
