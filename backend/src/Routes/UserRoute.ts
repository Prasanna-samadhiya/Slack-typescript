const express=require("express")
const { UserRegister, UserLogin, GetAllusers, Authentication } = require("../Controllers/UserContoller")
const router=express.Router()

router.post("/register",UserRegister)
router.post("/login",UserLogin)
// router.get("/getallusers",Authentication,GetAllusers)

module.exports=router