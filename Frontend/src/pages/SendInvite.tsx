import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Workspace {
  name: string;
  description: string;
  channels: string[];
}

function SendInvite() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch workspaces from the backend
    
    axios.get("http://localhost:5000/channel/allchannels", { withCredentials: true })
      .then((response) => {
        console.log(response.data.channels)
        setWorkspaces(response.data.channels);
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
    console.log(selectedWorkspace?._id)
    if (inviteEmail) {
      
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Workspaces</h1>
          <ul className="mt-4">
            {workspaces.map((workspace, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg cursor-pointer ${selectedWorkspace?.name === workspace.name ? "bg-gray-700" : ""}`}
                onClick={() => setSelectedWorkspace(workspace)}
              >
                {workspace.name}
              </li>
            ))}
          </ul>
          <button
            className="w-full mt-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            onClick={() => navigate("/createworkspace")}
          >
            Create New Workspace
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        {selectedWorkspace ? (
          <>
            <h2 className="text-3xl font-bold mb-4">{selectedWorkspace.name}</h2>
            <p className="text-lg mb-4">{selectedWorkspace.description}</p>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold">Channels</h3>
              <ul className="mt-2">
                {/* {selectedWorkspace.channels.map((channel, index) => (
                  <li key={index} className="p-2 bg-white rounded-lg mb-2">
                    {channel}
                  </li>
                ))} */}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
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
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl">Select a workspace to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SendInvite;
