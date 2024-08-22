import { useState } from "react";
import Chatsname from "./Chatsname";
import Membername from "./Membername";

interface Props {
    Workspacename: string;
    Workspaceadmin: string;
    Genchats: string[];
    Members: string[];
}

function Workspacechatlist(props: Props) {
    const {Workspacename,Workspaceadmin,Genchats,Members} = props
    const [selectedWorkspace,setselectedWorkspace] = useState<string>("")

    return (
        <div>
            <div className=" bg-indigo-900 text-purple-lighter flex-none w-64 pb-6 hidden md:block h-full p-2">
        <div className="text-white mb-2 mt-3 px-4 flex justify-between">
            <div className="flex-auto">
                <h1 className="font-semibold text-xl leading-tight mb-1 truncate">{Workspacename}</h1>
                <div className="flex items-center mb-6">
                    <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>
                    <span className="text-white opacity-50 text-sm">{Workspaceadmin}</span>
                </div>
            </div>
            <div>
                <svg className="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
                    <path d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z" fill-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="mb-8">
            <div className="px-4 mb-2 text-white flex justify-between items-center">
                <div className="opacity-75">Channels</div>
                <div>
                    <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
            {/* displaying all the chats */}
            {
                Genchats.map((name:string)=>{
                    return <Chatsname chatname={name}/>
                })
            }
        </div>
        <div className="mb-8">
            <div className="px-4 mb-2 text-white flex justify-between items-center">
                <div className="opacity-75">Direct Messages</div>
                <div>
                    <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
            {
                Members.map((name:string)=>{
                    return <Membername Membername={name}/>
                })
            }
        </div>
        <div>
            <div className="px-4 mb-2 text-white flex justify-between items-center">
                <div className="opacity-75">Apps</div>
                <div>
                    <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Workspacechatlist
