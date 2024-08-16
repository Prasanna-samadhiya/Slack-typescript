const nodemailer=require("nodemailer")
import { Response } from 'express';
const dotenv=require("dotenv")

dotenv.config();

const CorrectHandler = (res: Response, message: string, statuscode: number) => {
    return res.status(statuscode).json({
        success: true,
        message: message
    });
}

const ErrorHandler = (res: Response, message: string, statuscode: number) => {
    return res.status(statuscode).json({
        success: false,  // Assuming this should be false since it's an error handler
        message: message,
    });
}

const UndefinedHandler = (res: Response, message: string, statuscode: number) => {
    return res.status(statuscode).json({
        success: false,  // Assuming this should be false since it's an undefined handler
        message: message,
    });
}

const NodeMailer=(from:string,to:string,subject:string,text:string)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER as string ,
          pass: process.env.PASS as string
        }
      });
      
      var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error:any, info:any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

export { CorrectHandler, ErrorHandler, UndefinedHandler, NodeMailer };
