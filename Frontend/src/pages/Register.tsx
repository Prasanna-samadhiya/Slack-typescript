import { useState } from "react"
import { useNavigate } from "react-router-dom";


interface Props {}

function Register(props: Props) {
    const {} = props
    const [email,setemail]=useState<string>("")
    const navigate = useNavigate();
    console.log(email)
    return (
        <div>
         
        <div className='text-3xl font-bold m-12'>
            Slack
        </div>
        <div>
            <div className='text-6xl font-bold m-5'>
               First,enter your email
            </div>
            <div className='text-xl font-medium text-slate-600 m-5'>
               We suggest using the <b>email address you use at work</b>.
            </div>
        </div>

        <div className='flex flex-col w-[470px] ml-96'>
          <input type='email' className='rounded-xl h-12 w-[470px] my-8 p-2 border-2' placeholder='name@work-email.com' onChange={(e)=>{setemail(e.target.value)}}/>
          <button className='bg-violet-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl h-12'>Continue</button>
        </div>
        
        <div className='text-xl m-10'>
          ------------------  or  --------------------
        </div>
        <div className='flex justify-center items-center flex-col'>
            <div className='border-4 m-4 w-[400px] p-3 rounded-xl hover:bg-slate-200' onClick={()=>{navigate("/register2")}}>Continue with registration</div>
            <div className='border-4 m-4 w-[400px] p-3 rounded-xl hover:bg-slate-200 ' >
                
                   <div>Continue with Google</div>
                </div>
        </div>

        <div className='text-slate-500 text-lg m-3'>
           Already using Slack?
        </div>
        <div className='text-blue-700 underline text-lg m-3'>
            Sign in to an existing workspace
        </div>
        
        <div className='flex flex-row space-x-7 ml-96 py-16'>

        <div className='text-gray-500 text-lg'>
            Privacy & Terms 
        </div>
        <div className='text-gray-500 text-lg'>
            Contact Use
        </div>
        <div className='text-gray-500 text-lg'>
             <select><option>Change Region</option></select>
        </div>

        </div>

        </div>
    )
}

export default Register
