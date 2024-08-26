const express=require("express")
const { CreateGchat,DeleteGchat,GetGchat,UpdateGchat } = require("../Controllers/GenController")
const { Authentication } = require("../Controllers/UserContoller")

const router=express.Router()

router.post("/creategchat",Authentication,CreateGchat)
router.delete("/deletegchat/:id",Authentication,DeleteGchat)
router.get("/getallgchat",Authentication,GetGchat)
router.patch("/gupdate/:id",Authentication,UpdateGchat)


module.exports=router