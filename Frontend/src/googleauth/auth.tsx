import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/current_user', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/logout', { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <span>Welcome, {user.googleId}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <GoogleLoginButton />
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

// Google Login Button Component
const GoogleLoginButton: React.FC = () => {
  const { signIn } = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await axios.post('http://localhost:5000/auth/google', {}, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          },
          withCredentials: true
        });
        window.location.reload();
      } catch (error) {
        console.error('Error authenticating with Google', error);
      }
    },
    onError: (error) => {
      console.error('Login failed', error);
    },
  });

  return (
    <button onClick={signIn}>Login with Google</button>
  );
};

// Home component
const Home: React.FC = () => (
  <h1>Home Page</h1>
);

// Wrap App component with GoogleOAuthProvider
const Root: React.FC = () => (
  <GoogleOAuthProvider clientId={"402609058071-g7tqs925b4f7r662eni6mvlemcc71a2r.apps.googleusercontent.com"}>
    <App />
  </GoogleOAuthProvider>
);

export default Root;
