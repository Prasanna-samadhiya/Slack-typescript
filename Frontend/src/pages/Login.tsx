import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { loggedinSuccess } from "../Redux/Reducers/UserReducer/UserReducer";
import Navbar from "../CreatedComponents/Navbar/Navbar";
import Footer from "../CreatedComponents/Footer/Footer";

interface LoginFormData {
    email: string;
    password: string;
}

function Login() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    });
    const [isequal,setisequal]=useState<Boolean>(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
       if(!formData.email||!formData.password){
        setisequal(true)
       }else{
        setisequal(false)
       }
        
    },[formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async() => {
        // Add form validation or submission logic here
        if(!isequal){
            console.log(formData);
            await axios.post("http://localhost:5000/user/login",formData,{withCredentials: true}).then((result:any) => {
                console.log(result)
                dispatch(loggedinSuccess({name:result.data.user.username,email:result.data.user.email}))
                navigate("/sendinvite"); 
                } ).catch((err:any) => {
                console.log(err.response)
                });
            
        }else{
            console.log("not allowed")
        }
        
    };

    return (
        <div className="absolute left-0 top-0 w-full">
        <Navbar/>
        <div className="flex justify-center items-center h-[550px] bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <div className="space-y-4">
                    
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {isequal?<div className='text-red-700'>All fields are compulsory</div>:<div></div>}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 text-white bg-violet-950 rounded-lg hover:bg-blue-700"
                >
                    Register
                </button>
                <div className="text-center text-sm text-gray-500">
                    Already have an organisation email?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-700 underline cursor-pointer"
                    >
                        Sign in
                    </span>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default Login;

