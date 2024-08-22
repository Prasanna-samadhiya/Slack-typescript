import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

interface WorkspaceFormData {
    name: string;
    description: string;
}

function CreateWorkspace() {
    const [formData, setFormData] = useState<WorkspaceFormData>({
        name: "",
        description: "",
    });
    
    const [isempty,setisempty] = useState<Boolean>(false)

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async() => {
        // Add form validation or submission logic here
        if(!isempty){
            console.log(formData);
            await axios.post("http://localhost:5000/channel/createchannel",formData,{withCredentials: true}).then((result:any) => {
                console.log(result)
                navigate("/sendinvite");
            }).catch((err:any) => {
                console.log(err.message)
            });
            
        }else{
            console.log("not allowed")
        }
    };

    useEffect(()=>{
        if(!formData.description||!formData.name){
                setisempty(true)
        }else{
               setisempty(false)
        } 
    },[formData])
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center">Create Workspace</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Workspace Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Workspace Description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                {isempty?<div className='text-red-600'>
                    Both fields are required
                </div>:<div></div>}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 text-white bg-violet-950 rounded-lg hover:bg-blue-700"
                >
                    Create Workspace
                </button>
                <div className="text-center text-sm text-gray-500">
                    Have email of an existing workspace?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-700 underline cursor-pointer"
                    >
                        Join here
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CreateWorkspace;
