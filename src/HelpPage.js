// Help/ContactMe.js
import React, { useState, useContext } from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { FaConnectdevelop, FaHome, FaSignOutAlt, FaBook, FaInfoCircle } from 'react-icons/fa';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './HelpPage.css'; // Make sure this CSS file contains the styles for this page
import './HomePage.css'; // Only if styles from here are needed
import { auth } from './firebase-config';
import { AuthContext } from './AuthContext';
import logo from './logo.jpg'; // Ensure this path is correct

function ContactMe() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    // Implement the submit logic here
  };

  return (
    <div className="contact-me-container">
      {/* Header Section */}
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
          <h1>UNILIFE</h1>
        </div>
        {currentUser && <p>Welcome, {currentUser.email}</p>}
      </div>
      
      {/* Navigation Menu */}
      <div className="menu-bar">
        <Menu iconShape="square">
          <MenuItem icon={<FaHome />} onClick={() => navigate('/home')}> Home </MenuItem>
          <MenuItem icon={<BsCalendar2MonthFill />} onClick={() => navigate('/calendar')}> Calendar </MenuItem>
          <MenuItem icon={<FaConnectdevelop />} onClick={() => navigate('/connect')}> Connect </MenuItem>
          <MenuItem icon={<FaBook />} onClick={() => navigate('/courses')}> Courses </MenuItem>
          <MenuItem icon={<FaInfoCircle />} onClick={() => navigate('/help')}> Help </MenuItem>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}> Logout </MenuItem>
        </Menu>
      </div>

      <div className="contact">
      {/* Contact Form Section */}
      <h1>Contact Us / Help</h1>
      <p>If you have any questions or need assistance, please fill out the form below.</p>
      
      {submitted ? (
        <div className="thank-you-message">Thank you for reaching out. We will get back to you shortly.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required onChange={handleChange} value={formData.name} />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required onChange={handleChange} value={formData.email} />
          
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required onChange={handleChange} value={formData.message}></textarea>
          
          <button type="submit">Submit</button>
        </form>
      )}
      </div>
    </div>
  );
}

export default ContactMe;
