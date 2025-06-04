import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard!</h2>
      <p>This is your dashboard. Your lessons will appear here soon.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;