import parse from "html-react-parser"

interface Props {
    sender: string;
    time: string;
    content: string;
}

function Message(props: Props) {
    const {sender,time,content} = props

    return (
        <div className="my-4 w-fit h-[100px]">
        <div className="flex items-start text-sm">
            <img 
                src="https://twitter.com/steveschoger/profile_image" 
                alt={sender.charAt(0)} 
                className="w-16 h-16 rounded-full mr-4 shadow-lg"
            />
            <div className="flex-1 bg-white  rounded-lg shadow-md flex flex-row">
                <div className="flex justify-between items-center  flex-col bg-slate-300 p-3">
                    <span className="font-semibold text-gray-900">{sender}</span>
                    <span className="text-gray-500 text-xs">{time}</span>
                </div>
                <div className="text-gray-800 leading-relaxed mx-16 mt-4">
                    {parse(content)}
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default Message
