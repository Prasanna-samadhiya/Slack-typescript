import mongoose, { Schema, model, Document } from 'mongoose';

interface Pchat extends Document {
  name: string;
  description: string;
  createdByname: string;
  allowedmembers: string[];
  messages: {
    sender:string;
    avatar:string;
    content:string;
    time:string;
  }[]
}

const PchatSchema = new Schema<Pchat>({
  name: { type: String },
  description: { type: String},
  createdByname: { type: String, required: true },
  allowedmembers:[
    {
        type:String
    }
  ]
  ,
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
        },
        time:{
          type:String
        }
    }
  ]
},{timestamps:true});

const Pchat = model<Pchat>('Pchat', PchatSchema);



export default Pchat;