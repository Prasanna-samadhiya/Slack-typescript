import { Schema, model, Document } from 'mongoose';
const mongoose=require('mongoose')

interface IMessage extends Document {
  sender: Schema.Types.ObjectId; //  sender
  receiver: Schema.Types.ObjectId; // User ID (for DM) or Channel ID (for normal messaging)
  content: string;
  timestamp: Date;
  isDM: boolean; //  indicate if it's a DM or normal message
  isPrivate: boolean;// indicate if it beongs to a private chat
}

// Define the schema
const messageSchema = new Schema<IMessage>({
  sender: {
     type: Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
    },
  receiver: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    }, // or Channel depending on the message type
  content: { 
    type: String, 
    required: true 
    },
  timestamp: { 
    type: Date, 
    default: Date.now
    },
  isDM: {
    type: Boolean, 
    required: true 
  },
  isPrivate: {
    type: Boolean, 
    required: true 
  }
});

messageSchema.pre('save', function (next) {
  if (typeof this.sender === 'string') {
    this.sender = new mongoose.Types.ObjectId(this.sender);
  }
  if (typeof this.receiver === 'string') {
    this.receiver = new mongoose.Types.ObjectId(this.receiver);
  }
  next();
});

const Message = model<IMessage>('Message', messageSchema);


export default Message;

