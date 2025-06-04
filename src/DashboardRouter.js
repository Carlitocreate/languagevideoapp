import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import StudentDashboard from './StudentDashboard';
import CoachDashboard from './CoachDashboard';

function DashboardRouter() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          console.log('Current user UID:', user.uid); // Log the UID
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userRole = userDoc.data().role;
            console.log('Fetched role:', userRole); // Log the fetched role
            setRole(userRole);
          } else {
            setError('User document does not exist in Firestore.');
            console.error('No user document found for UID:', user.uid);
          }
        } else {
          setError('No user is currently logged in.');
          console.error('No authenticated user found.');
        }
      } catch (err) {
        setError('Failed to fetch user role: ' + err.message);
        console.error('Error fetching user role:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  if (role === 'student') {
    return <StudentDashboard handleLogout={handleLogout} />;
  } else if (role === 'language_coach') {
    return <CoachDashboard handleLogout={handleLogout} />;
  } else {
    return (
      <div>
        <h2>Error</h2>
        <p>Invalid user role: {role || 'undefined'}. Please contact support.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
}

export default DashboardRouter;