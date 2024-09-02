import { useState } from "react";
import Chatsname from "./Chatsname";
import Membername from "./Membername";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Generalchatadded, Privatechatadded } from "../../Redux/Reducers/WorkspaceReducer/WorkspaceReducer";

interface Props {
    Workspacename: string;
    Workspaceadmin: string;
    Genchats: string[];
    Penchats: string[];
    Members: string[];
}

function Workspacechatlist(props: Props) {
    let {Workspacename,Workspaceadmin,Genchats,Members,Penchats} = props
    const [Gchats,setGchats] = useState([])
    const [Pchats,setPchats] = useState([])
    const [showchat,setshowchat] = useState<Boolean>(false)
    const [showgen,setshowgen] = useState<Boolean>(false)
    const [showpen,setshowpen] = useState<Boolean>(false)
    const [showgform,setshowgform] = useState<Boolean>(false)
    const [showpform,setshowpform] = useState<Boolean>(false)
    const [showpmem,setshowpmem] = useState<Boolean>(false)
    const [pallow,setpallow] = useState<string[]>([])
    const [gform,setgform] = useState({
        name:"",
        description:""
    })
    const [pform,setpform] = useState({
        name:"",
        description:""
    })
    // const [showdm,setshowdm] = useState<Boolean>(false)
    
    Members=["member1","member2","member3","member4"]
    const dispatch=useDispatch();

    React.useEffect(()=>{
        const specificworkspace=async()=>{
           await axios.post("http://localhost:5000/channel/specificchannel",{name:Workspacename}).then(
            (response)=>{
                console.log(response.data.channel.generalchats);
                setGchats(response.data.channel.generalchats);
                setPchats(response.data.channel.privatechats)
            }
           ).catch((err)=>{
            console.log(err.response)
           })
        }
        console.log(Gchats,Pchats)
        specificworkspace();
    },[])

    const handlegchat=async()=>{
        setshowgform(false);
        await axios.post("http://localhost:5000/gchat/creategchat",{...gform,channelname:Workspacename},{withCredentials:true}).then((result)=>{
           console.log(result.data)
        //    Gchats.push(result.data.gchat.name)
        //    dispatch(Generalchatadded(result.data.gchat.name))
           setGchats([...Gchats,result.data.gchat.name])
           console.log(result.data.channel.generalchats)
        }).catch((err)=>{
            console.log(err.response.data)
        })
    }
    
    const handlepchat=async()=>{
        await axios.post("http://localhost:5000/pchat/createpchat",{name:pform.name,description:pform.description,channelname:Workspacename,allowedmembers:pallow},{withCredentials:true}).then((result)=>{
          console.log(result.data);
        //    Penchats.push(result.data.pchat.name);
        //    dispatch(Privatechatadded(result.data.pchat.name))
        setPchats([...Pchats,result.data.pchat.name])
           setshowpform(false);
           setpallow([])
        }).catch((err)=>{
            console.log(err.response.data)
        })
    }

    const handlegchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
         setgform({...gform,[e.target.name]:e.target.value})
    }
    
    const handlepchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setpform({...pform,[e.target.name]:e.target.value})
   }
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
                <div onClick={()=>{setshowgen(!showgen)}} className="cursor-pointer hover:bg-indigo-900 w-[253px]">
                    General Chats
                    <FontAwesomeIcon icon={faPlus} onClick={()=>{setshowgform(!showgform)}} className="px-2 "/>
                </div>
                {
                    showgform?
                    <div id="Gform" className="absolute top-[30%] left-[45%] bg-violet-600 px-16 rounded-xl" >
                     <div>
                        <div className="relative top-0 bg-red-700 w-full round px-10 rounded-lg text-xl py-2">Create General chat</div>
                        <div>name:</div><input type="text" className="m-2 h-10 text-black" name="name" onChange={handlegchange}></input>
                       
                        <div>description:</div><input type="text" className="m-2 h-10 text-black" name="description" onChange={handlegchange}></input>
                        <div><button className="bg-green-600 p-3 rounded-xl my-4" onClick={handlegchat}>Create chat</button></div>
                     </div>
                    </div>:null
                }
            {
                showgen?Gchats.map((name:string)=>{
                    return <Chatsname chatname={name}/>
                }):null
            }
            </div>
            <div className="my-3">
                <div className="cursor-pointer hover:bg-indigo-900 w-[253px] flex flex-row px-16">
                    <div onClick={()=>setshowpen(!showpen)}>Private Chats</div>
                    <FontAwesomeIcon icon={faPlus} onClick={()=>{setshowpform(!showpform)}} className="px-2 py-1"/>
                </div>
                {
                    showpform?
                    <div id="Pform" className="absolute top-[30%] left-[45%] bg-violet-600 px-16 rounded-xl h-96">
                     <div>
                        <div className="relative top-0 bg-red-700 w-full round px-10 rounded-lg text-xl py-2">Create Private chat</div>
                        <div>name:</div><input type="text" className="m-2 h-10 text-black" name="name" onChange={handlepchange}></input>
                       
                        <div>description:</div><input type="text" className="m-2 h-10 text-black" name="description" onChange={handlepchange}></input>
                        <div><button className="bg-green-600 p-3 rounded-xl my-4" onClick={handlepchat}>Create chat</button></div>
                   </div>
                     <div>
                        <select className="bg-green-600 p-1 px-2 rounded-lg">
                            {
                                Members.map((ele:string)=>{
                                    return <option onClick={()=>{
                                        console.log("hk")
                                        setshowpmem(true)
                                        if(!pallow.includes(ele)){
                                           setpallow([...pallow,ele])
                                        }
                                        console.log(pallow)
                                    }}>{ele}</option>
                                })
                            }
                        </select>
                        <div className="flex flex-row flex-wrap">
                        {
                                showpmem?
                                 pallow.map((ele:string,index)=>{
                                    return <div className="flex flex-row bg-green-600 w-24 m-2 p-1 rounded-lg">
                                           <div className="bg-green-600">{ele}</div>
                                           <FontAwesomeIcon className="p-1"icon={faXmark} onClick={()=>{
                                            console.log("batao")
                                            const pallow1=[...pallow]
                                           pallow1.splice(index,1)
                                           setpallow(pallow1)
                                           }}/>
                                           </div>
                                 }):null
                            }
                        </div>
                     </div>
                    </div>:null
                }
            {
                showpen?Pchats.map((name:string)=>{
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