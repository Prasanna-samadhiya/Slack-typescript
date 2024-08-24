import { useState } from "react";
import Chatsname from "./Chatsname";
import Membername from "./Membername";

interface Props {
    Workspacename: string;
    Workspaceadmin: string;
    Genchats: string[];
    Penchats: string[];
    Members: string[];
}

function Workspacechatlist(props: Props) {
    const {Workspacename,Workspaceadmin,Genchats,Members,Penchats} = props
    const [showchat,setshowchat] = useState<Boolean>(false)
    const [showgen,setshowgen] = useState<Boolean>(false)
    const [showpen,setshowpen] = useState<Boolean>(false)
    // const [showdm,setshowdm] = useState<Boolean>(false)

    return (
        <div>
            <div className=" bg-indigo-800 text-purple-lighter flex-none w-64 pb-6 hidden md:block h-full p-2">
        <div className="text-white mb-2 mt-3 px-4 flex justify-between">
            <div className="flex-auto">
                <h1 className="font-semibold text-xl leading-tight mb-1 truncate">{Workspacename}</h1>
                <div className="flex items-center mb-6 p-3">
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
        <div className="mb-8 flex justify-evenly flex-col">
            <div className="px-4 text-white flex justify-between items-center flex-col mb-8">
                <div className="opacity-75 text-xl cursor-pointer relative hover:bg-indigo-900 w-[253px]" onClick={()=>(setshowchat(!showchat))}>Chats</div>
                {showchat?
                <div>
            {/* displaying all the chats */}
            <div className="my-3">
                <div onClick={()=>{setshowgen(!showgen)}} className="cursor-pointer hover:bg-indigo-900 w-[253px]">General Chats</div>
            {
                showgen?Genchats.map((name:string)=>{
                    return <Chatsname chatname={name}/>
                }):null
            }
            </div>
            <div className="my-3">
                <div onClick={()=>{setshowpen(!showpen)}} className="cursor-pointer hover:bg-indigo-900 w-[253px]">Private Chats</div>
            {
                showpen?Penchats.map((name:string)=>{
                    return <Chatsname chatname={name}/>
                }):null
            }   
            </div>
            </div>:null}
        </div>
        <div className="mb-8 flex flex-col">
            <div className="mb-2 text-white flex justify-between items-center">
                <div className="opacity-75 text-xl px-6 cursor-pointer hover:bg-indigo-900 w-[265px]">Direct Messages</div>
                
            </div>
            {
                Members.map((name:string)=>{
                    return <Membername Membername={name}/>
                })
            }
        </div>
        <div>
            <div className=" mb-2 text-white">
                <div className="opacity-75 text-xl cursor-pointer hover:bg-indigo-900 w-[248px]">Apps</div>
            </div>
        </div>
    </div>
        </div>
        </div>
    )
}

export default Workspacechatlist
