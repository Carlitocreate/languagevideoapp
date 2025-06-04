import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function CoachDashboard({ handleLogout }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, 'lessons'),
          where('coachId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const lessonList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonList);
      }
      setLoading(false);
    };
    fetchLessons();
  }, []);

  return (
    <div className="dashboard coach-dashboard">
      <h2>Language Coach Dashboard</h2>
      <p>Welcome, coach! Here are your upcoming lessons:</p>
      {loading ? (
        <p>Loading lessons...</p>
      ) : lessons.length > 0 ? (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <p>
                Lesson on {new Date(lesson.dateTime).toLocaleString()}:{' '}
                <a href={lesson.meetingLink} target="_blank" rel="noopener noreferrer">
                  Join Video Call
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming lessons.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default CoachDashboard;