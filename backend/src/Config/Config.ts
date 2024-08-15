const mongoose=require("mongoose")
const dotenv=require("dotenv")

const DBconnect=async()=>{
    await mongoose.connect(process.env.URI as string).then(
    ()=>{console.log("DB connected")
}).catch((err:any)=>{
    console.log(err)
})
}

module.exports=DBconnect