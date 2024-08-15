const channelModel = require('../Modals/Channel/ChannelModal');
const userModel = require('../Modals/User/UserModal');
const { UndefinedHandler, ErrorHandler, CorrectHandler } = require('../Utilities/utilites');
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const CreateChannel = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Not logged in yet",
    });
  }

  const authUser = await userModel.findById(user._id);
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Channel Name is required!!!",
    });
  }

  const NewChannel = await channelModel.create({
    name: name,
    description: description || "",
    createdBy: authUser._id,
  });

  if (!NewChannel) {
    return res.status(400).json({
      success: false,
      message: "Channel could not be created",
    });
  }

  // Applying data association between channel and user model
  authUser.channels.push(NewChannel._id);
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
      return res.status(402).json({
        success: false,
        message: "Unauthorized Access Denied",
      });
    }

    if (!channelId) {
      return res.status(404).json({
        success: false,
        message: "ChannelId not provided",
      });
    }

    const channelToDelete = await channelModel.findById(channelId);
    console.log(channelToDelete)
    if (!channelToDelete) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    // Check the userId and ownerId of the channel
    if (loggedInUser._id.toString() !== channelToDelete.createdBy.toString()) {
      return res.status(402).json({
        success: false,
        message: "You can only delete your Channel(s)",
      });
    }

    if (!userTypedName) {
      return res.status(404).json({
        success: false,
        message: "Please type the channel name to confirm!!!",
      });
    }

    if (userTypedName.toString() !== channelToDelete.name.toString()) {
      return res.status(400).json({
        success: false,
        message: "Check the channel name you have typed!!!",
      });
    }

    const index = loggedInUser.channels.findIndex(
      (channelIdInArray: string) => channelIdInArray.toString() === channelId.toString()
    );

    if (index !== -1) {
      loggedInUser.channels.splice(index, 1);
      await loggedInUser.save();
    }

    const deletedChannel = await channelModel.findByIdAndDelete(channelId);

    if (!deletedChannel) {
      return res.status(400).json({
        success: false,
        message: "Channel could not be deleted!!!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Channel Deleted Successfully!!!",
      deletedChannel,
    });
  } catch (error: any) {
    console.log("hi")
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateChannel, deleteChannel };
