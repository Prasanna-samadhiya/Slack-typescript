import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

// Define the interface for the Invite document
interface IInvite extends mongoose.Document {
    email: string;
    channel: mongoose.Types.ObjectId;
    invitedBy: mongoose.Types.ObjectId;
    status: 'Pending' | 'Accepted' | 'Declined';
    createdAt: Date;
}

// Define the Invite schema
const InviteSchema = new mongoose.Schema<IInvite>({
    email: {
        type: String,
        required: true,
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create and export the Invite model
const Invite = mongoose.model<IInvite>('Invite', InviteSchema);
module.exports = Invite;
