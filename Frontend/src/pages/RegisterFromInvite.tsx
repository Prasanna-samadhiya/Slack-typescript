import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Registerfrominvite = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [channelname, setchannelname] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // This object represents the current URL and is immutable.
  const location = useLocation();
  // defines utility methods to work with the query string of a URL.
  const query = new URLSearchParams(location.search);
  // Returns the first value associated to the given search parameter.
  const token = query.get("token");

  useEffect(() => {
    //to check if the token is present or not
    if (!token) {
      setError("Invalid or missing invite token");
    }
    //getting all invites to display the particular invite that the user has
    const GetInvites=async()=>{
        //calling a api to get the workspace name
        axios.get("http://localhost:5000/invite/getinvites").then((result) => {
            result.data.result.map(
              (ele:any)=>{
                //checking if the token which is in the url is same or not 
                if(token==ele.token){
                  setchannelname(ele.channelname)
                }else{
                //optional only for testing
                  console.log("ele token not matched")
                }
              })
        }).catch((err) => {
            console.log(err)
        });
    }
    GetInvites()
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Invite token is missing");
      return;
    }

    try {
      //api call to registr the user with an invite
      const response:any = await axios.post(
        "http://localhost:5000/invite/RegisterUserWithInvite",
        { username, password },
        {
          params: { token },
          withCredentials: true
        }
      ).then((result)=>{console.log(result.data.channel.name)});
      if (response.status === 200) {
        navigate("/login"); // Redirect to login page on successful registration
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 flex-col relative ">
      <div className="absolute left-0 top-0  4 w-full h-[150px] text-5xl bg-violet-950 text-slate-200 py-14">Welcome to {channelname}!!!</div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center">Register with Invite</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-950"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-violet-950 rounded-lg hover:bg-violet-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registerfrominvite;
