import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
const bcrypt = require('bcrypt');

// Define the interface for the User document
interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    channels: mongoose.Types.ObjectId[];
    avatar?: string;
    status?: string;
    createdAt: Date;
}

// Define the User schema
const UserSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
        },
    ],
    avatar: {
        type: String,
    },
    status: {
        type: String,
        default: 'Available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
module.exports = User;
