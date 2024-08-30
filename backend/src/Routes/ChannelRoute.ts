const express=require("express")
const { CreateChannel, deleteChannel ,UpdateChannel,GetAllchannels,Setchannel,specificchannel} = require("../Controllers/ChannelController")
const { Authentication } = require("../Controllers/UserContoller")

const router=express.Router()

router.post("/createchannel",Authentication,CreateChannel)
router.get("/allchannels",GetAllchannels)
router.post("/specificchannel",specificchannel)
router.post("/deletechannel/:channelId",Authentication,deleteChannel)
router.post("/updatechannel/:channelId",Authentication,UpdateChannel)
router.get("/setc/:id",Authentication,Setchannel)

module.exports=router