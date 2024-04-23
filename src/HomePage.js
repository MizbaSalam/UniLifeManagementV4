import React, { useState, useContext } from 'react'; // Import useEffect here
import {  Menu, MenuItem} from 'react-pro-sidebar'
import { FaConnectdevelop, FaHome, FaSignOutAlt, FaBook, FaInfoCircle } from 'react-icons/fa';
import {BsCalendar2MonthFill} from 'react-icons/bs'
import 'react-pro-sidebar/dist/css/styles.css';
import 'react-calendar/dist/Calendar.css';
import './HomePage.css'; // Make sure to create a HomePage.css file in the same directory
import {  auth } from './firebase-config';
import { signOut } from 'firebase/auth'; // Import signOut for Firebase v9+
import { AuthContext } from './AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg'; // Update the path to the actual logo's path
import { Link } from 'react-router-dom';




function Home() {
  //const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
 // const [date, setDate] = useState(new Date());
  const { currentUser } = useContext(AuthContext); // Use useContext to access the current user
  const navigate = useNavigate(); // Use the custom hook
  const [assignments, setAssignments] = useState([
    { id: 1, name: 'Assignment 1', dueDate: '2024-02-10' },
    { id: 2, name: 'Assignment 2', dueDate: '2024-02-15' }
]);

const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

const removeAssignment = (id) => {
  setAssignments(prev => prev.filter(assignment => assignment.id !== id));
};

const addTask = () => {
  if (task) {
    setTasks([...tasks, task]);
    setTask('');
  }
};
const removeTask = (index) => {
  setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
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
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* This div wraps the image and title */}
      <img src={logo} alt="Logo" style={{ height: '50px' }} /> {/* Adjust height as needed */}
        <h1>UNILIFE</h1>
        {currentUser && (
          <div>
            <p>Welcome, {currentUser.email}</p>
          </div>
        )}
      </div>
      </div>
      <div className="menu-bar">
        <Menu iconShape="square">
          <MenuItem icon={<FaHome />} onClick={() => navigate('/home')}> Home</MenuItem>
          <MenuItem icon={<BsCalendar2MonthFill />}onClick={() => navigate('/calender')}> Calendar</MenuItem>
          <MenuItem icon={<FaConnectdevelop />} onClick={() => navigate('/connect')}> Connect</MenuItem>
          <MenuItem icon={<FaBook />} onClick={() => navigate('/courses')}> Courses</MenuItem>
          <MenuItem icon={<FaInfoCircle />} onClick={() => navigate('/help')}> Help</MenuItem>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}> Logout</MenuItem>

        </Menu>
      </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <div className="container announcements">
        <h2>Announcements</h2>
        <p><strong>Welcome to Unilife!</strong></p>
      </div>
      <div className="container assignments">
        <h2>Assignments Due soon</h2>
        <ul>
          {assignments.map(assignment => (
            <li key={assignment.id} onClick={() => removeAssignment(assignment.id)}>
              {assignment.name} - Due: {assignment.dueDate}
            </li>
          ))}
        </ul>
      </div>
       {/* To Do List section */}
     <div className="container todo-list">
      <h2>To Do List</h2>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask} className="add-task-btn">Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)} className="remove-task-btn">Remove</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  </div>
);
}

export default Home;
