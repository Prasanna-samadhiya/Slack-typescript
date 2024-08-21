import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Registerfrominvite = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing invite token");
    }
    const GetInvites=async()=>{
        axios.get("http://localhost:5000/invite/getinvites").then((result) => {
            console.log(result.data.result)
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
      const response = await axios.post(
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
