import mongoose, { Schema, model, Document } from 'mongoose';

interface IInvite extends Document {
  email: string;
  token: string;
  role: string;
  channelid: mongoose.Types.ObjectId;
  expiresAt: Date;
}

const inviteSchema = new Schema<IInvite>({
  email: { type: String },
  token: { type: String, required: true },
  role: { type: String, required: true },
  channelid:{type:mongoose.Schema.Types.ObjectId, required: true},
  expiresAt: { type: Date, required: true },
  channelname:{ type:String }
});

const Invite = model<IInvite>('Invite', inviteSchema);



module.exports=Invite;
