import parse from "html-react-parser";
import { useSelector } from "react-redux";

interface Props {
    sender: string;
    time: string;
    content: string;
}

function Message({ sender, time, content }: Props) {
    const user = useSelector((state: any) => state.auth.details.name);

    // Determine alignment based on sender
    const isUserMessage = sender === user;

    // Dynamic profile image (for example purposes, update as needed)

    return (
        <div className={`my-4 w-full h-[100px] ${isUserMessage ? "flex justify-start" : "flex justify-end"}`}>
            <div className={`flex items-start text-sm `}>
                {/* Profile image */}
                <img 
                    src=""
                    alt= {sender[0]} 
                    className="w-16 h-16 rounded-full mr-4 shadow-lg"
                />

                {/* Message container */}
                <div className={`flex-1 rounded-lg shadow-md flex flex-col ${isUserMessage ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}>
                    <div className="flex flex-row">
                    <div className={`flex justify-between items-center p-3 flex-col ${isUserMessage ? "bg-blue-600" : "bg-slate-300"}`}>
                        <span className="font-semibold">{sender}</span>
                        
                    </div>
                    <div className="leading-relaxed mx-4 mt-2 text-xl">
                        {parse(content)}
                    </div>
                    </div>
                    <span className={`text-xs ${isUserMessage ? "bg-blue-600" : "bg-slate-300"}`}>{time}</span>
                </div>
            </div>
        </div>
    );
}

export default Message;
