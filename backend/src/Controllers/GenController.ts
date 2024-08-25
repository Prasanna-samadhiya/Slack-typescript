import { Request, Response } from "express";
import Gchat from "../Modals/GeneralChats/generalchatsmodal";
import { ErrorHandler, UndefinedHandler } from "../Utilities/utilites";

//creating a interface to add the req.user which is not possible at Request type
interface AuthenticatedRequest extends Request {
    user?: any;
  }

const CreateGchat=async(req:AuthenticatedRequest,res:Response)=>{
     try{
        const user = req.user;
        if (!user) {
        return ErrorHandler(res,"Not logged in yet",403);
        }
        const body=req.body
        console.log(body)
        if (!body.name){
            return ErrorHandler(res,"please enter name",401);
        }
        const gchat=await Gchat.create({name:body.name,description:body.description,createdByname:user.username})
        user.generalcreated.push(gchat.name)
        await user.save()
        res.status(201).json({success:true,message:"Chat created",gchat})
    }catch(err){
        return UndefinedHandler(res,"Undefined err",500)
    }
}

const DeleteGchat=async(req:AuthenticatedRequest,res:Response)=>{
    try{
       const user = req.user;
       if (!user) {
       return ErrorHandler(res,"Not logged in yet",403);
       }
       const {id}=req.params
       if (!id){
           return ErrorHandler(res,"id not given",401);
       }
       const gchat=await Gchat.findByIdAndDelete(id)
       if (!gchat){
        return ErrorHandler(res,"chat not found",401);
       }
       const index = user.generalcreated.findIndex(
        (channelIdInArray: string) => channelIdInArray.toString() === id.toString()
         );
  
       if (index !== -1) {
        user.generalcreated.splice(index, 1);
        await user.save();
      }
  
       res.status(201).json({success:true,message:"Chat deleted",gchat})
   }catch(err){
       return UndefinedHandler(res,"Undefined err",500)
   }
}



module.exports= {CreateGchat,DeleteGchat}