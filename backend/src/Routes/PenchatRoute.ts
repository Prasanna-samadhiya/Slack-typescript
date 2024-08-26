const express=require("express")
const { CreatePchat,DeletePchat,GetPchat,UpdatePchat } = require("../Controllers/PenController")
const { Authentication } = require("../Controllers/UserContoller")

const router=express.Router()

router.post("/createpchat",Authentication,CreatePchat)
router.delete("/deletepchat/:id",Authentication,DeletePchat)
router.get("/getallpchat",Authentication,GetPchat)
router.patch("/pupdate/:id",Authentication,UpdatePchat)


module.exports=router