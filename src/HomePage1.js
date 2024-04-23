import React, { useState, useContext } from 'react'; // Import useEffect here
import Calendar from 'react-calendar';
import {  Menu, MenuItem} from 'react-pro-sidebar'
import { FaCalendar, FaConnectdevelop, FaHome, FaSignOutAlt, FaBook } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import 'react-calendar/dist/Calendar.css';
import './HomePage.css'; // Make sure to create a HomePage.css file in the same directory
import {  auth } from './firebase-config';
import { signOut } from 'firebase/auth'; // Import signOut for Firebase v9+
import { AuthContext } from './AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom';



function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [date, setDate] = useState(new Date());
  const { currentUser } = useContext(AuthContext); // Use useContext to access the current user
  const navigate = useNavigate(); // Use the custom hook
  const [assignments, setAssignments] = useState([
    { id: 1, name: 'Assignment 1', dueDate: '2024-02-10' },
    { id: 2, name: 'Assignment 2', dueDate: '2024-02-15' }
]);

const removeAssignment = (id) => {
  setAssignments(prev => prev.filter(assignment => assignment.id !== id));
};
const handleLogout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('User signed out successfully');
    navigate('/');
  }).catch((error) => {
    // An error happened.
    console.error('Error signing out: ', error);
  });
};

  return (
    
    <div className="home-container">
    
    <div className="content">
      <div className="header">
        <h1>UNILIFE</h1>
        {currentUser && (
          <div>
            <p>Welcome, {currentUser.email}</p>
          </div>
        )}
      </div>
      <div className="menu-bar">
        <Menu iconShape="square">
          <MenuItem icon={<FaHome />} onClick={() => navigate('/home')}>Home</MenuItem>
          <MenuItem icon={<FaCalendar />}onClick={() => navigate('/calender')}>Calendar</MenuItem>
          <MenuItem icon={<FaConnectdevelop />} onClick={() => navigate('/connect')}>Connect</MenuItem>
          <MenuItem icon={<FaBook />} onClick={() => navigate('/home')}>Courses</MenuItem>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <div className="container announcements">
        <h2>Announcements</h2>
        <p>Welcome to Unilife</p>
      </div>
      <div className="container assignments">
        <h2>Assignments Due</h2>
        <ul>
          {assignments.map(assignment => (
            <li key={assignment.id} onClick={() => removeAssignment(assignment.id)}>
              {assignment.name} - Due: {assignment.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}

export default Home;
