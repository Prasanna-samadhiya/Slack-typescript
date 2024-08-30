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
  const inviteLink = `http://localhost:5173/registerfrominvite?token=${token}`;
  
  const invite = await Invite.findOne({ token })
  const channel = await channelModel.findById(invite.channelid)
  // Configure nodemailer transporter (replace with your email service config)
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #007bff;
            padding: 20px;
            color: #ffffff;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 30px;
        }
        .email-body h2 {
            color: #007bff;
            font-size: 22px;
            margin-bottom: 20px;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .email-footer {
            padding: 20px;
            text-align: center;
            background-color: #f4f4f4;
            color: #666;
            font-size: 14px;
        }
        .email-footer p {
            margin: 0;
        }
        .email-button {
            display: inline-block;
            padding: 15px 25px;
            font-size: 18px;
            color: #ffffff;
            background-color: #28a745;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .email-button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Welcome to ${channel.name}</h1>
        </div>
        <div class="email-body">
            <h2>Hello,User!</h2>
            <p>Thank you for signing up on our platform. We're thrilled to have you on board. To complete your registration, please confirm your email address by clicking the button below:</p>
            <a href="http://localhost:5173/registerfrominvite?token=${token}" class="email-button">Confirm Email</a>
            <p>If you did not create an account with us, please disregard this email.</p>
        </div>
        <div class="email-footer">
            <p>Need help? Contact our support team at support@yourcompany.com</p>
            <p>© 2024 [Your Company Name]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

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
    html: htmlContent
    // html: `Click the link to register and join ${channel.name}: ${inviteLink}`,
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
  

  const registerUser = async (token: string, userDetails: any,channel:any): Promise<void> => {
    //using the verify token which returns invite from model
    const invite = await verifyInviteToken(token);
  
    if (invite) {
      // Proceed with user registration
      // You can use invite.email and invite.role as needed
      const newUser = new User({
        email: invite.email,
        ...userDetails
      });
      newUser.partof?.push(channel._id)
      await newUser.save();
      
  
      // Optionally, delete the invite after successful registration
      await Invite.deleteOne({ _id: invite._id });
    }
    else{
      console.log("register through invite is not workings")
    }
  };
  
const SendingUserInvite =async(req:Request,res:Response,next:NextFunction)=>{
    const {InviteEmail}=req.body;
    const {id} =req.params;
    
    const inviteToken = uuidv4(); // This is the token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    const channel = await channelModel.findById(id)

    const invite = new Invite({
      email: InviteEmail,
      token: inviteToken,
      role:"User",
      channelid:id,
      expiresAt,
      channelname:channel?.name
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
    const channel = await channelModel.findById(invite?.channelid)
    await registerUser(token as string, { username, email: invite?.email, password},channel);
    res.status(200).json({success:true, message: 'User registered successfully' ,channel});
  } catch (error:any) {
    res.status(400).json({ success:false, message: error.message });
  }
};

const getAllInvites=async(req:Request,res:Response,next:NextFunction)=>{
     try{
        const result=await Invite.find()
        res.status(201).json({success:true,message:"invites feetched successfully",result})
     }catch(err){
        res.status(500).json({success:false,message:"unidentified error"})
     }
}


module.exports={SendingUserInvite,RegisterUserWithInvite,getAllInvites}