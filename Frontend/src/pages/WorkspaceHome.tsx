import { useSelector } from "react-redux"
import Workspacechatcontent from "../CreatedComponents/Chat content/Workspacechatcontent"
import Workspacechatlist from "../CreatedComponents/Chat List/Workspacechatlist"
import Workspacesidebar from "../CreatedComponents/Side Bar/Workspacesidebar"
import { Authstate } from "../CreatedComponents/Private Route/PrivateRoute"


interface Props {}

function WorkspaceHome(props: Props) {
    const {} = props
    const user=useSelector((state:Authstate)=>state.auth)
    console.log(user.workspaces)
    const members:string[]=["member1","member2","member3","member4"]
    const genchats:string[]=["genchat1","genchat2","genchat3","genchat4"] 
    const Workspacename:string="Slack_Organisation"
    const Workspaceadmin:string="Prasanna"

    return (
            <div className="font-sans antialiased h-full w-full flex absolute left-0 top-0 ">
                {/* Sidebar  */}
                <Workspacesidebar profilename={user?.details?.name as string}/>
                {/* Chat List */}
                <Workspacechatlist Workspacename={Workspacename} Workspaceadmin={Workspaceadmin} Members={members} Genchats={genchats}/>
                {/* Chat content */}
                <Workspacechatcontent chatname="Clicked chat" description="chat Description"/>
            </div>
    )
}

export default WorkspaceHome
