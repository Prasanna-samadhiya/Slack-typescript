const express=require("express")
const { CreateGchat,DeleteGchat } = require("../Controllers/GenController")
const { Authentication } = require("../Controllers/UserContoller")

const router=express.Router()

router.post("/creategchat",Authentication,CreateGchat)
router.delete("/deletegchat/:id",Authentication,DeleteGchat)


module.exports=router