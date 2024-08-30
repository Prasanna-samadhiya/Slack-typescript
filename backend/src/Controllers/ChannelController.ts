const channelModel = require('../Modals/Channel/ChannelModal');
const userModel = require('../Modals/User/UserModal');
const { UndefinedHandler, ErrorHandler, CorrectHandler } = require('../Utilities/utilites');
// importing types from @types/express 
import { Request, Response, NextFunction } from 'express';
import { NodeMailer } from '../Utilities/utilites';

//creating a interface to add the req.user which is not possible at Request type
interface AuthenticatedRequest extends Request {
  user?: any;
}

const CreateChannel = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  console.log("user:",user)
  if (!user) {
    return ErrorHandler(res,"Not logged in yet",401);
  }

  const authUser = await userModel.findById(user._id);
  const { name, description } = req.body;

  if (!name) {
    return ErrorHandler(res,"Channel Name is required",400);
  }

  const NewChannel = await channelModel.create({
    name: name,
    description: description || "",
    createdBy: authUser._id,
    createdByname: authUser.username
  });

  if (!NewChannel) {
    return ErrorHandler(res,"channel could not be created")
  }

  NodeMailer("prasannasamadhiya02@gmail.com",authUser.email,"Channel Created",`Your channel ${NewChannel.name} was created`) 

  authUser.channels.push(NewChannel._id);
  authUser.partof.push(NewChannel.id);
  await authUser.save();

  return res.status(201).json({
    success: true,
    message: "Channel Created Successfully",
    NewChannel,
  });
};

const deleteChannel = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { userTypedName } = req.body;
    const { channelId } = req.params;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return ErrorHandler(res,"Unauthorized Access Denied",402);
    }

    if (!channelId) {
      return ErrorHandler(res,"channelId not provided",401);
    }

    const channelToDelete = await channelModel.findById(channelId);
    console.log(channelToDelete)
    if (!channelToDelete) {
      return ErrorHandler(res,"channel not found");
    }

    // Check the userId and ownerId of the channel
    if (loggedInUser._id.toString() !== channelToDelete.createdBy.toString()) {
      return ErrorHandler(res,"You can only delete your Channel",402);
    }

    if (!userTypedName) {
      return ErrorHandler(res,"type the channel name to confirm",401);
    }

    if (userTypedName.toString() !== channelToDelete.name.toString()) {
      return ErrorHandler(res,"Check the channel name you have typed",400);
    }

    const index = loggedInUser.channels.findIndex(
      (channelIdInArray: string) => channelIdInArray.toString() === channelId.toString()
    );

    if (index !== -1) {
      loggedInUser.channels.splice(index, 1);
      loggedInUser.partof.splice(index,1);
      await loggedInUser.save();
    }

    const deletedChannel = await channelModel.findByIdAndDelete(channelId);

    if (!deletedChannel) {
      return ErrorHandler(res,"channel could not be deleted",400);
    }
    
    NodeMailer("prasannasamadhiya02@gmail.com",loggedInUser.email,"Channel Deleted",`Your channel ${deletedChannel.name} was deleted`)

    return res.status(201).json({
      success: true,
      message: "Channel Deleted Successfully!!!",
      deletedChannel,
    });
  } catch (error: any) {
    console.log("hi")
    return UndefinedHandler(res,error.message,500);
  }
};

const UpdateChannel=async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  try {
    const {channelId} = req.params
    const loggedInUser = req.user
         
    if (!loggedInUser){
          return ErrorHandler(res,"User not logged in",402);
         }


    const channelToUpdate = await channelModel.findById(channelId)
    if(!channelToUpdate){
          return ErrorHandler(res,"Channel not found",401);

         }

        //   The user who is updating the channel and the owner of the channel must be same :-

    if(loggedInUser._id.toString() !== channelToUpdate.createdBy.toString()){
            return ErrorHandler(res,"You can only update your channel details",402);
         }

    const updatedChannel = await channelModel.findByIdAndUpdate(channelId , {...req.body} , {new : true})

    if (!updatedChannel) {
            return ErrorHandler(res,"Channel could not get updated",400);
         }

    return  res.status (202).json ({
        success : true,
        message : "Channel got updated successfully ",
        updatedChannel
       })

} catch (error) {
    UndefinedHandler(res,"Some unidentified problems",500);
  }
};

const GetAllchannels=async(req:Request,res:Response,next:NextFunction)=>{
  
    const channels=await channelModel.find();


    res.status(201).json({
      success:true,
      channels
    })
  
}

const specificchannel=async(req:Request,res:Response)=>{
  const {name} = req.body;
  const channel = await channelModel.findOne({name:name})
  if(!channel){
    return ErrorHandler(res,"Workspace not found",201)
  }
  return res.status(201).json({success:true,channel})
}

const Setchannel=async(req:Request,res:Response)=>{
   const {id} = req.params
   if(!id){
      return ErrorHandler(res,"id not given",401)
   }
   const channel=await channelModel.findById(id);
   if(!channel){
    return ErrorHandler(res,"channel not found",404)
   }
   res.status(201).json({success:true,message:"channel added for future use"})
}
module.exports = { CreateChannel, deleteChannel ,UpdateChannel,GetAllchannels,Setchannel,specificchannel};
