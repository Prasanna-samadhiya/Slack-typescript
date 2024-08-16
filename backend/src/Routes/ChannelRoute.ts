const express=require("express")
const { CreateChannel, deleteChannel ,UpdateChannel,GetAllchannels} = require("../Controllers/ChannelController")
const { Authentication } = require("../Controllers/UserContoller")

const router=express.Router()

router.post("/createchannel",Authentication,CreateChannel)
router.get("/allchannels",Authentication,GetAllchannels)
router.post("/deletechannel/:channelId",Authentication,deleteChannel)
router.post("/updatechannel/:channelId",Authentication,UpdateChannel)

module.exports=router