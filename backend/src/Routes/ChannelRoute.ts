const express=require("express")
const { CreateChannel, deleteChannel } = require("../Controllers/ChannelController")
const { Authentication } = require("../Controllers/UserContoller")

const router=express.Router()

router.post("/createchannel",Authentication,CreateChannel)
router.post("/deletechannel/:channelId",Authentication,deleteChannel)

module.exports=router