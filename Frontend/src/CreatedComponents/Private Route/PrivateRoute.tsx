import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

interface Props {}

export interface Authstate{
      auth:{
        details:{name:string;email:string;}|undefined
        isloggedin:boolean;
        workspaces:{workspace:string;workspacedescription:string;}[];
        ison:string;
      }
}

function PrivateRoute(props: Props) {
    const {} = props
    const isloggedin=useSelector((state:Authstate)=>state.auth.isloggedin)
    console.log(isloggedin)

    return (
        isloggedin ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute
