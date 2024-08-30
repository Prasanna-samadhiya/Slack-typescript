import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../CreatedComponents/Footer/Footer";
import Navbar from "../CreatedComponents/Navbar/Navbar";

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
    const [isequal, setIsequal] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsequal(formData.password !== formData.confirmPassword);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!isequal) {
            try {
                const result = await axios.post("http://localhost:5000/user/register", formData);
                console.log(result);
                navigate("/login");
            } catch (err: any) {
                console.log(err.response.data);
            }
        } else {
            console.log("Passwords do not match.");
        }
    };

    return (
        <div className="h-full flex flex-col w-full absolute top-0 left-0">
            <Navbar />
            <div className="flex-grow flex justify-center items-center bg-gray-100">
                <div className="max-w-lg w-full p-8 space-y-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
                    <div className="space-y-6">
                        <div className="flex flex-col space-y-4">
                            <div className="relative">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {isequal && (
                            <div className="text-red-600 text-sm flex items-center space-x-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                <span>Passwords do not match.</span>
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-pink-500 shadow-lg"
                        >
                            Register
                        </button>
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-pink-600 underline cursor-pointer"
                            >
                                Sign in
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
