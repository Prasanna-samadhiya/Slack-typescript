import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isequal,setisequal]=useState<Boolean>(false)

    const navigate = useNavigate();

    useEffect(()=>{
    
        if(formData.password!=formData.confirmPassword){
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
            await axios.post("http://localhost:5000/user/register",formData).then((result:any) => {
                console.log(result)
                navigate("/login"); 
                } ).catch((err:any) => {
                console.log(err.response.data)
                });
            
        }else{
            console.log("not allowed")
        }
        
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <div className="space-y-4">
                    
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
                        value={formData.username}
                        onChange={handleChange}
                    />
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {isequal?<div className='text-red-700'>Enter same password as in both fields</div>:<div></div>}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 text-white bg-violet-950 rounded-lg hover:bg-blue-700"
                >
                    Register
                </button>
                <div className="text-center text-sm text-gray-500">
                    Already have an email?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-700 underline cursor-pointer"
                    >
                        Sign in
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;

