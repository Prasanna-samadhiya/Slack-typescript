const express=require("express")
const { UserRegister, UserLogin, GetAllUsers, Authentication,DeleteUser,RegisterwithEmail } = require("../Controllers/UserContoller")
const router=express.Router()

router.post("/register",UserRegister)
router.post("/registeremail",RegisterwithEmail)
router.post("/login",UserLogin)
router.post("/delete/:userid",DeleteUser)
router.get("/getallusers",Authentication,GetAllUsers)

module.exports=router