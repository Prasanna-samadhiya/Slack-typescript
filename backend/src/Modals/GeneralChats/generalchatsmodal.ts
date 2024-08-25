import mongoose, { Schema, model, Document } from 'mongoose';

interface Gchat extends Document {
  name: string;
  description: string;
  createdByname: string;
  messages: {
    sender:string;
    avatar:string;
    content:string;
  }[]
}

const GchatSchema = new Schema<Gchat>({
  name: { type: String },
  description: { type: String },
  createdByname: { type: String, required: true },
  messages:[
    {
        sender:{
            type:String
        },
        avatar:{
            type:String
        },
        content:{
            type:String
        }
    }
  ]
},{timestamps:true});

const Gchat = model<Gchat>('Gchat', GchatSchema);



export default Gchat;
