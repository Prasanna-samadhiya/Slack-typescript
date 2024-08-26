import { Request, Response } from "express";
import Pchat from "../Modals/PrivateChats/privatechatsmodal";
import { ErrorHandler, UndefinedHandler } from "../Utilities/utilites";
const channelModel = require('../Modals/Channel/ChannelModal');


//creating a interface to add the req.user which is not possible at Request type
interface AuthenticatedRequest extends Request {
    user?: any;
  }

const CreatePchat=async(req:AuthenticatedRequest,res:Response)=>{
     try{
        const user = req.user;
        if (!user) {
        return ErrorHandler(res,"Not logged in yet",403);
        }
        const body=req.body
        const {channelname}=req.body
        console.log(body)
        if (!body.name){
            return ErrorHandler(res,"please enter name",401);
        }
        const channel=await channelModel.findOne({name:channelname})
        if(!channel){
            return ErrorHandler(res,"channel not found",404);
        }
        const pchat=await Pchat.create({name:body.name,description:body.description,allowedmembers:body.allowedmembers,createdByname:user.username})
        user.privatecreated.push(pchat.name)
        channel.privatechats.push(pchat.name)
        await user.save()
        await channel.save()
        res.status(201).json({success:true,message:"Chat created",pchat})
    }catch(err){
        return UndefinedHandler(res,"Undefined err",500)
    }
}

const DeletePchat=async(req:AuthenticatedRequest,res:Response)=>{
    try{
       const user = req.user;
       if (!user) {
       return ErrorHandler(res,"Not logged in yet",403);
       }
       const {id}=req.params;
       const {channelname}=req.body;
       if (!id){
           return ErrorHandler(res,"id not given",401);
       }
       const channel=await channelModel.findOne({name:channelname})
        if(!channel){
            return ErrorHandler(res,"channel not found",404);
        }
       const pchat=await Pchat.findByIdAndDelete(id)
       if (!pchat){
        return ErrorHandler(res,"chat not found",401);
       }
       const index = user.privatecreated.findIndex(
        (channelIdInArray: string) => channelIdInArray.toString() === pchat.name.toString()
         );
  
       if (index !== -1) {
        user.privatecreated.splice(index, 1);
        await user.save();
      }

      const index1 = channel.privatechats.findIndex(
        (channelIdInArray: string) => channelIdInArray.toString() === pchat.name.toString()
         );
  
       if (index1 !== -1) {
        console.log("hi")
        channel.privatechats.splice(index1, 1);
        await channel.save();
      }
       

       res.status(201).json({success:true,message:"Chat deleted",pchat})
   }catch(err){
        console.log(err)
       return UndefinedHandler(res,"Undefined err",500)
   }
}

const GetPchat=async(req:AuthenticatedRequest,res:Response)=>{
    try{
       const ghcats=await Pchat.find();
       res.status(201).json({success:true,message:"all gchats getted successfully",ghcats})
    }catch(err){
     UndefinedHandler(res,"undefined problems",500)
    }
 }

 const UpdatePchat=async(req:AuthenticatedRequest,res:Response)=>{
    try{
       const user = req.user;
       if (!user) {
       return ErrorHandler(res,"Not logged in yet",403);
       }
       const body=req.body
       const {channelname}=req.body
       const {id}=req.params
       console.log(body)
       if (!body.name){
           return ErrorHandler(res,"please enter name",401);
       }
       const channel=await channelModel.findOne({name:channelname})
        if(!channel){
            return ErrorHandler(res,"channel not found",404);
        }
       const p1chat=await Pchat.findById(id)
       if(!p1chat){
          return ErrorHandler(res,"private chat not found",404)
       }
       const pchat=await Pchat.findByIdAndUpdate(id,{name:body.name,description:body.description,allowedmembers:body.allowedmembers})
       await user.save()
       res.status(201).json({success:true,message:"Chat created",pchat})
   }catch(err){
       return UndefinedHandler(res,"Undefined err",500)
   }
}

module.exports= {CreatePchat,DeletePchat,GetPchat,UpdatePchat}