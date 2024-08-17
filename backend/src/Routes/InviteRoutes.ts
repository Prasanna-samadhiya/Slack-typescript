const express=require("express")
const { Authentication } = require("../Controllers/UserContoller")
const {SendingUserInvite,RegisterUserWithInvite} = require("../Controllers/InviteController")

const router=express.Router()

router.post("/sendinguserinvite",SendingUserInvite)
router.post("/RegisterUserWithInvite",RegisterUserWithInvite)

module.exports=router


