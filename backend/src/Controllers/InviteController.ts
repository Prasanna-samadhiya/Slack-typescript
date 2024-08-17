import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const channelModel=require("../Modals/Channel/ChannelModal")
const Invite=require("../Modals/Invite/InviteModal")
const User=require("../Modals/User/UserModal")
const { UndefinedHandler, ErrorHandler, CorrectHandler } = require('../Utilities/utilites');
const nodemailer=require('nodemailer');
import mongoose from "mongoose";

//interface to hepl create function and promise
interface IInvite extends Document {
  email: string;
  token: string;
  role: string;
  channelid: mongoose.Types.ObjectId;
  expiresAt: Date;
  _id:Types.ObjectId;
} 

//function to create email which sends a link to the user
const sendInviteEmail = async (inviteeEmail: string, token: string): Promise<void> => {
  //creating link for the sharing in local
  try{
  const inviteLink = `http://localhost:5000/invite/sendinguserinvite/token=${token}`;
  
  const invite = await Invite.findOne({ token })
  const channel = await channelModel.findById(invite.channelid)
  // Configure nodemailer transporter (replace with your email service config)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prasannasamadhiya02@gmail.com',
      pass: 'wwqq gyva xrri hvcn',
    },
  });

  const mailOptions = {
    from: 'prasannasamadhiya02@gmail.com',
    to: inviteeEmail,
    subject: `You are invited to join ${channel.name}!`,
    text: `Click the link to register and join ${channel.name}: ${inviteLink}`,
  };
   
  await transporter.sendMail(mailOptions);}catch(err:any){
    console.log(err.message)
  }
};

//now the link send to the mail ,we need to verify it
const verifyInviteToken = async (token: string): Promise<IInvite | null> => {
    //searching for the invite in its collection
    try{const invite = await Invite.findOne({ token });
    
    //telling if the invite is there or expired
    if (!invite || invite.expiresAt < new Date()) {
      throw new Error('Invalid or expired invite token');
    }
  
    return invite;
    }catch(err:any){
      console.log(err.message)
      return null
    }
  };
  

  const registerUser = async (token: string, userDetails: any): Promise<void> => {
    //using the verify token which returns invite from model
    const invite = await verifyInviteToken(token);
  
    if (invite) {
      // Proceed with user registration
      // You can use invite.email and invite.role as needed
      const newUser = new User({
        email: invite.email,
        ...userDetails
      });
  
      await newUser.save();
  
      // Optionally, delete the invite after successful registration
      await Invite.deleteOne({ _id: invite._id });
    }
    else{
      console.log("register through invite is not workings")
    }
  };
  
const SendingUserInvite =async(req:Request,res:Response,next:NextFunction)=>{
    const {InviteEmail,role,channelid}=req.body;
    
    const inviteToken = uuidv4(); // This is the token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    
    const invite = new Invite({
      email: InviteEmail,
      token: inviteToken,
      role,
      channelid:channelid,
      expiresAt,
    });
  
    await invite.save();

    await sendInviteEmail(InviteEmail,inviteToken).then(()=>{
      res.status(201).send("mail with link send")
    }).catch((err)=>{
      res.status(500).send(err.message)
    })
}


const RegisterUserWithInvite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;
    const { password, username } = req.body;
    console.log(token)
    // Verify the token
    const invite = await verifyInviteToken(token as string);
    console.log(invite)
    // Register the user
    await registerUser(token as string, { username, email: invite?.email, password });

    res.status(200).json({success:true, message: 'User registered successfully' });
  } catch (error:any) {
    res.status(400).json({ success:false, message: error.message });
  }
};


module.exports={SendingUserInvite,RegisterUserWithInvite}