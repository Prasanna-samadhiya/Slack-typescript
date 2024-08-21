const express=require("express")
const { Authentication } = require("../Controllers/UserContoller")
const {SendingUserInvite,RegisterUserWithInvite,getAllInvites} = require("../Controllers/InviteController")

const router=express.Router()

router.post("/sendinguserinvite/:id",SendingUserInvite)
router.post("/RegisterUserWithInvite",RegisterUserWithInvite)
router.get("/getinvites",getAllInvites)

module.exports=router


