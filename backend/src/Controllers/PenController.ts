import { Request, Response } from "express";
import Pchat from "../Modals/PrivateChats/privatechatsmodal";
import { ErrorHandler, UndefinedHandler } from "../Utilities/utilites";

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
        console.log(body)
        if (!body.name){
            return ErrorHandler(res,"please enter name",401);
        }
        const pchat=await Pchat.create({name:body.name,description:body.description,createdByname:user.username})
        user.privatecreated.push(pchat.name)
        await user.save()
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
       const {id}=req.params
       if (!id){
           return ErrorHandler(res,"id not given",401);
       }
       const pchat=await Pchat.findByIdAndDelete(id)
       if (!pchat){
        return ErrorHandler(res,"chat not found",401);
       }
       const index = user.privatecreated.findIndex(
        (channelIdInArray: string) => channelIdInArray.toString() === id.toString()
         );
  
       if (index !== -1) {
        user.privatecreated.splice(index, 1);
        await user.save();
      }
  
       res.status(201).json({success:true,message:"Chat deleted",pchat})
   }catch(err){
       return UndefinedHandler(res,"Undefined err",500)
   }
}



module.exports= {CreatePchat,DeletePchat}