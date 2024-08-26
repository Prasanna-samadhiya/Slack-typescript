import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Footer from "../CreatedComponents/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Workspaceselected } from "../Redux/Reducers/WorkspaceReducer/WorkspaceReducer";
import { Authstate } from "../CreatedComponents/Private Route/PrivateRoute";

//interface of the workspace creates
interface Workspace {
  name: string;
  description: string;
  createdByname: string;
  members: string[];
  generalchats: string[];
  //channel here signifies chats
  privatechats: string[];
  channels: string[];
  _id: string;
}


function SendInvite() {
  //array of all workspaces
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  //the workspace the user has selected
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  //holds the invite email
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const dispatch=useDispatch()
  const navigate = useNavigate();
  

  
  const user=useSelector((state:Authstate)=>state?.auth?.details?.name)
  console.log(user)

  useEffect(() => {
    // Fetch workspaces from the backend
    axios.get("http://localhost:5000/channel/allchannels", { withCredentials: true })
      .then((response) => {
        setWorkspaces(response.data.channels.filter((ele:any)=>ele.createdByname==user));
        console.log(workspaces)
        setSelectedWorkspace(response.data.channels[0]); // Default to the first workspace
      })
      .catch((error) => {
        console.log(error.message);
        // Handle not logged in scenario
        if (error.response.status === 401) {
          navigate("/login");
        }
      });

     
  }, [navigate]);

  
  const handleInvite = () => {
    console.log(selectedWorkspace)
    if (inviteEmail) {
      //sending the invite to the email given
      axios.post(`http://localhost:5000/invite/sendinguserinvite/${selectedWorkspace?._id}`, { InviteEmail: inviteEmail }, { withCredentials: true })
        .then(() => {
          alert(`Invitation sent to ${inviteEmail}`);
          setInviteEmail("");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
    <div className="flex h-full flex-col w-full">
      {/* Sidebar */}
      <div className=" bg-gray-800 text-white w-full absolute left-0 top-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Workspaces</h1>
          <button
            className="w-48 mt-4 py-2 bg-blue-600 rounded-lg hover:bg-green-700"
            onClick={() => navigate("/createworkspace")}
          > 
            Create New Workspace
          </button>
          <div className="mt-4 flex flex-row ">
            {workspaces.length?
            <select className="bg-green-600 p-3 rounded-xl">
            {workspaces.map((workspace, index) => (
              <option
                key={index}
                className={`p-2 rounded-lg cursor-pointer ${selectedWorkspace?.name === workspace.name ? "bg-gray-700" : ""}`}
                onClick={() => {setSelectedWorkspace(workspace);console.log(workspace)}}
              >
                {workspace.name}
              </option>
            ))}
            </select>
            :
            <div className="bg-green-600 p-3 rounded-xl">No workspaces</div>
            }  
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 absolute left-0 w-full top-44 h-[790px]">
        {selectedWorkspace ? (
          <>
            <h2 className="text-3xl font-bold mb-4 relative t">{selectedWorkspace.name}</h2>
            <p className="text-lg mb-4">{selectedWorkspace.description}</p>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold">Invite a new person</h3>
              <ul className="mt-2">
                {/*
                   //optional getting all the general chats
                   {selectedWorkspace.channels.map((channel, index) => (
                   <li key={index} className="p-2 bg-white rounded-lg mb-2">
                    {channel}
                   </li>
                  ))} 
                 */
                }
              </ul>
            </div>
            
            <div className="w-full justify-center items-center flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-2xl font-semibold mb-4">Invite Users</h3>
              <input
                type="email"
                name="InviteEmail"
                placeholder="Enter user's email"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <button
                onClick={handleInvite}
                className="w-full py-2 bg-violet-950 text-white rounded-lg hover:bg-violet-800"
              >
                Send Invite
              </button>
            </div>
            <div className="m-10">
              <button 
                className="bg-blue-950 text-slate-200 p-3 rounded-xl" 
                  onClick={async()=>{
                      console.log("hi",selectedWorkspace);
                      dispatch(Workspaceselected({
                        wname:selectedWorkspace.name,
                        wadmin:selectedWorkspace.createdByname,
                        members:[...selectedWorkspace.members],
                        genchats:[...selectedWorkspace.generalchats],
                        pchats:[...selectedWorkspace.privatechats]
                        }))
                      axios.get("")
                      navigate("/workspacehome")
                  }}
                  >
                   Visit your workspace
              </button>
            </div>
            <div className="w-[1900px]">
            <Footer/>
            </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl">Select a workspace to view details</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default SendInvite;
