import './CoursesPage.css'; // Your CSS file for styling
import React, { useState, useContext } from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { FaConnectdevelop, FaHome, FaSignOutAlt, FaBook, FaInfoCircle } from 'react-icons/fa';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { AuthContext } from './AuthContext';
import logo from './logo.jpg'; // Ensure this path is correct

const coursesData = {

  "Spring 2024": [
    {
      id: "swe632",
      name: "UI/UX",
      code: "10241.202410",
      instructor: "Jon Doe",
    },
    {
        id: "swe634",
        name: "Website Building",
        code: "10241.202410",
        instructor: "Jon Doe",
      }
  ],
  "Fall 2024": [
    {
      id: "swe642",
      name: "Component based Software",
      code: "20470.73489",
      instructor: "Jane Que",
    },
    {
        id: "swe645",
        name: "Analysis designing",
        code: "10241.202410",
        instructor: "Jon Doe",
      }
  ]
};

function CoursesPage() {

    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

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
  
  return (
    <div className="courses-container">

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

      <h1>Current Courses</h1>
      {/* Render Spring 2024 Courses */}
      <section>
        <h2>Spring 2024</h2>
        <div className="course-grid">
          {coursesData["Spring 2024"].map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-info">
                <h3>{course.name}</h3>
                <p>{course.code}</p>
                <p>{course.instructor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Render Fall 2024 Courses */}
      <section>
        <h2>Upcoming Fall 2024</h2>
        <div className="course-grid">
          {coursesData["Fall 2024"].map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-info">
                <h3>{course.name}</h3>
                <p>{course.code}</p>
                <p>{course.instructor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CoursesPage;
