const jwt = require("jsonwebtoken");
const userModel = require("../Modals/User/UserModal");
const channelModel =require("../Modals/Channel/ChannelModal")
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');
import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';
import { CorrectHandler, ErrorHandler, NodeMailer, UndefinedHandler } from '../Utilities/utilites';
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const Authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { myslacktoken } = req.cookies;
  const authtoken = myslacktoken;
  console.log("token:",authtoken)
  if (!authtoken) {
    return next(UndefinedHandler(res,"User not logged in yet",401))
  }

  try {
    //typecasting process.env.SECRET to string
    const decoded = jwt.verify(authtoken, "prasanna");
    console.log(decoded);

    req.user = await userModel.findById(decoded.id);
    console.log("user:",req.user);
    next();
  } catch (err) {
    return next(ErrorHandler(res,"Invalid or expired token",500))
  }
};

const UserRegister = async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
  try {
    const { username, fullname, email, password } = req.body;
    const result = await userModel.create({ username, fullname, email, password });
    NodeMailer("prasannasamadhiya02@gmail.com",result.email,"Account Created","Great to have you onboard on our software")
    req.user=result
    return res.status(201).json({message:"Registered successfully",result})
  } catch (err) {
    next(UndefinedHandler(res,"Server Error",500));
  }
};

const UserLogin = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await userModel.findOne({ email });

    if (!result) {
      return next(ErrorHandler(res,"User not found",401))
    }

    const match = await bcrypt.compare(password, result.password);

    if (!match) {
      return next(ErrorHandler(res,"Incorrect password",401))
    }

    const payload = {
      id: result._id,
      name: result.username,
    };

    const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: 86400 });

    return res
      .cookie("myslacktoken", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }) // 2 hours
      .status(200)
      .json({
        message: "Logged in successfully",
        user: result,
      });
  } catch (err) {
    next(UndefinedHandler(res,"Server Error",500));
  }
};

const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userModel.find();

    if (!result || result.length === 0) {
      return ErrorHandler(res,"No users found",401);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return UndefinedHandler(res,"Server Error",500);
  }
};

const DeleteUser=async(req:Request,res:Response)=>{
  try{
    const {userid}=req.params 
    if(!userid){
      return ErrorHandler(res,"User id not available",401);
    }
    const user=await userModel.findById(userid)
    if(!user){
      return ErrorHandler(res,"User not found",401);
    }
    user.channels.map(async(ele:string,index:Number,arr:string[])=>{
        const deletedchannel=await channelModel.findByIdAndDelete(ele)
    })
    const deleteduser=await userModel.findByIdAndDelete(userid)
   
    NodeMailer("prasannasamadhiya02@gmail.com",user.email,"Account Deleted","Said to say you goodbye,hope you will join soon")

    res.status(201).json({
      success:true,
      message:"User deleted",
      deleteduser
    })
  }catch(err){
    console.log(err);
    ErrorHandler(res,"Server Error",500);
  }
}

module.exports = { UserRegister, UserLogin, GetAllUsers, Authentication ,DeleteUser};
