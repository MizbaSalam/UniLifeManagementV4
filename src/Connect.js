import React,{useContext} from 'react';
import PostFeed from './PostFeed';
//import Chat from './Chat';
import './Connect.css'; // Ensure you have this CSS file in your project
import { FaHome } from 'react-icons/fa';
import { FaCalendar, FaConnectdevelop, FaSignOutAlt, FaBook, FaInfoCircle } from 'react-icons/fa';
import {  Menu, MenuItem} from 'react-pro-sidebar'
import { useNavigate } from 'react-router-dom';
import {  auth } from './firebase-config';
import { signOut } from 'firebase/auth'; // Import signOut for Firebase v9+
import logo from './logo.jpg'; // Update the path to the actual logo's path
import { AuthContext } from './AuthContext'; // Import the AuthContext


const ConnectPage = () => {

  const navigate = useNavigate(); 
  const { currentUser } = useContext(AuthContext); // Use useContext to access the current user


  /* added by mizba for version 3*/
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
    <div className='connectMain'>
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
          <MenuItem icon={<FaHome />} onClick={() => navigate('/home')}>Home</MenuItem>
          <MenuItem icon={<FaCalendar />}onClick={() => navigate('/calender')}>Calendar</MenuItem>
          <MenuItem icon={<FaConnectdevelop />} onClick={() => navigate('/connect')}>Connect</MenuItem>
          <MenuItem icon={<FaBook />} onClick={() => navigate('/home')}>Courses</MenuItem>
          <MenuItem icon={<FaInfoCircle />} onClick={() => navigate('/help')}> Help</MenuItem>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    <div className="connectPage">
      <div className="feedContainer">
        <PostFeed />
      </div>

    </div>
    </div>
  );
};


export default ConnectPage;
