import { Request, Response } from "express";
import Gchat from "../Modals/GeneralChats/generalchatsmodal";
import { ErrorHandler, UndefinedHandler } from "../Utilities/utilites";
const channelModel = require('../Modals/Channel/ChannelModal');


//creating a interface to add the req.user which is not possible at Request type
interface AuthenticatedRequest extends Request {
    user?: any;
    channel?: any;
  }


const CreateGchat=async(req:AuthenticatedRequest,res:Response)=>{
     try{
        const user = req.user;
        if (!user) {
        return ErrorHandler(res,"Not logged in yet",403);
        }
        const body=req.body;
        const {channelname}=req.body;
        console.log(body)
        if (!body.name){
            return ErrorHandler(res,"please enter name",401);
        }
        const channel=await channelModel.findOne({name:channelname})
        if(!channel){
            return ErrorHandler(res,"channel not found",404);
        }
        const gchat=await Gchat.create({name:body.name,description:body.description,createdByname:user.username})
        user.generalcreated.push(gchat.name)
        channel.generalchats.push(gchat.name)
        await user.save()
        await channel.save()
        res.status(201).json({success:true,message:"Chat created",gchat})
    }catch(err){
        console.log(err)
        return UndefinedHandler(res,"Undefined err",500)
    }
}

const DeleteGchat=async(req:AuthenticatedRequest,res:Response)=>{
    try{
       const user = req.user;
       const {channelname} = req.body;
       if (!user) {
       return ErrorHandler(res,"Not logged in yet",403);
       }
       const {id}=req.params
       if (!id){
           return ErrorHandler(res,"id not given",401);
       }
       const channel=await channelModel.findOne({name:channelname})
        if(!channel){
            return ErrorHandler(res,"channel not found",404);
        }
       const gchat=await Gchat.findByIdAndDelete(id)
       if (!gchat){
        return ErrorHandler(res,"chat not found",401);
       }
       const index = user.generalcreated.findIndex(
        (channelIdInArray: string) => channelIdInArray.toString() === gchat.name.toString()
         );
  
       if (index !== -1) {
        user.generalcreated.splice(index, 1);
        await user.save();
      }

      const index1 = channel.generalchats.findIndex(
        (channelIdInArray: string) => channelIdInArray.toString() === gchat.name.toString()
         );
  
       if (index1 !== -1) {
        console.log("hi")
        channel.generalchats.splice(index1, 1);
        await channel.save();
      }
      
       res.status(201).json({success:true,message:"Chat deleted",gchat})
   }catch(err){
       return UndefinedHandler(res,"Undefined err",500)
   }
}

const GetGchat=async(req:AuthenticatedRequest,res:Response)=>{
   try{
      const ghcats=await Gchat.find();
      res.status(201).json({success:true,message:"all gchats getted successfully",ghcats})
   }catch(err){
    UndefinedHandler(res,"undefined problems",500)
   }
}

const UpdateGchat=async(req:AuthenticatedRequest,res:Response)=>{
    try{
       const user = req.user;
       if (!user) {
       return ErrorHandler(res,"Not logged in yet",403);
       }
       const body=req.body
       const {id}=req.params
       console.log(body)
       if (!body.name){
           return ErrorHandler(res,"please enter name",401);
       }
       const p1chat=await Gchat.findById(id)
       if(!p1chat){
          return ErrorHandler(res,"general chat not found",404)
       }
       const gchat=await Gchat.findByIdAndUpdate(id,{name:body.name,description:body.description})
       user.generalcreated.push(gchat?.name)
       await user.save()
       res.status(201).json({success:true,message:"Chat created",gchat})
   }catch(err){
       return UndefinedHandler(res,"Undefined err",500)
   }
}



module.exports= {CreateGchat,DeleteGchat,GetGchat,UpdateGchat}