import { useSelector } from "react-redux"
import Workspacechatcontent from "../CreatedComponents/Chat content/Workspacechatcontent"
import Workspacechatlist from "../CreatedComponents/Chat List/Workspacechatlist"
import Workspacesidebar from "../CreatedComponents/Side Bar/Workspacesidebar"
import { Authstate } from "../CreatedComponents/Private Route/PrivateRoute"

interface WOState{
    wosp:{
        wname:string;
        wadmin:string;
        members:string[];
        genchats:string[];
        pchats:string[];
        chatname:string[];
        chatdes:string[];
    }
}

interface Chat{
    chat:{
        chatname:string;
    }
}

interface Props {}

function WorkspaceHome(props: Props) {
    const {} = props
    const user=useSelector((state:Authstate)=>state.auth)
    const workspace=useSelector((state:WOState)=>state.wosp)
    const chat=useSelector((state:Chat)=>state.chat.chatname)
    console.log(user.workspaces)
    console.log(workspace)
    console.log(chat)
    const members:string[]=[...workspace.members]
    const genchats:string[]=[...workspace.genchats]
    const penchats:string[]=[...workspace.pchats] 
    const Workspacename:string=workspace.wname
    const Workspaceadmin:string=workspace.wadmin

    return (
            <div className="font-sans antialiased h-full w-full flex absolute left-0 top-0 ">
                {/* Sidebar  */}
                <Workspacesidebar profilename={user?.details?.name as string}/>
                {/* Chat List */}
                <Workspacechatlist Workspacename={Workspacename} Workspaceadmin={Workspaceadmin} Members={members} Genchats={genchats} Penchats={penchats}/>
                {/* Chat content */}
                <Workspacechatcontent chatname={chat}/>
            </div>
    )
}

export default WorkspaceHome
