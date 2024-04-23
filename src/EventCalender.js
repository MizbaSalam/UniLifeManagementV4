import React, { useState , useContext} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Cal.css'; 
import { FaHome } from 'react-icons/fa'; // Ensures Cal.css is applied
import { FaCalendar, FaConnectdevelop, FaSignOutAlt, FaBook, FaInfoCircle } from 'react-icons/fa';
import {  Menu, MenuItem} from 'react-pro-sidebar'
import { useNavigate } from 'react-router-dom';
import {  auth } from './firebase-config';
import { signOut } from 'firebase/auth'; // Import signOut for Firebase v9+
import logo from './logo.jpg'; // Update the path to the actual logo's path
import { AuthContext } from './AuthContext'; // Import the AuthContext

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEventName, setNewEventName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext); // Use useContext to access the current user


  const handleDateChange = (newDate) => {
    setDate(newDate);
    setFeedbackMessage(''); // Clear feedback message when date changes
  };

  const addEvent = () => {
    const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    if (newEventName.trim() === '') {
      setFeedbackMessage('Please enter an event name.'); // Set error message
    } else {
      const newEvents = {
        ...events,
        [dateString]: [...(events[dateString] || []), newEventName]
      };
      setEvents(newEvents);
      setNewEventName(''); // Reset input
      setFeedbackMessage('Event added successfully.'); // Set success message
    }
  };

  const removeEvent = (eventDate, eventName) => {
    const updatedEvents = { ...events };
    updatedEvents[eventDate] = updatedEvents[eventDate].filter(event => event !== eventName);
    if (updatedEvents[eventDate].length === 0) {
      delete updatedEvents[eventDate]; // Remove the date if no events are left
    }
    setEvents(updatedEvents);
    setFeedbackMessage('Event removed.'); // Set feedback message
  };
  // Add by mizba for version 3
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
    <div className='calendar-main'>

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
      {/* Menu Bar */}
      <div className="menu-bar">
        <Menu iconShape="square">
          <MenuItem icon={<FaHome />} onClick={() => navigate('/home')}>Home</MenuItem>
          <MenuItem icon={<FaCalendar />} onClick={() => navigate('/calendar')}>Calendar</MenuItem>
          <MenuItem icon={<FaConnectdevelop />} onClick={() => navigate('/connect')}>Connect</MenuItem>
          <MenuItem icon={<FaBook />} onClick={() => navigate('/courses')}>Courses</MenuItem>
          <MenuItem icon={<FaInfoCircle />} onClick={() => navigate('/help')}> Help</MenuItem>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>

      {/* Event Calendar Container */}
      <div className="event-calendar-container">

        {/* Calendar Card */}
        <div className="calendar-card">
          <Calendar onChange={handleDateChange} value={date} />
        </div>

        {/* Event Input Card */}
        <div className="event-input-card">
          <input
            className="event-input"
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="New Event Name"
            aria-label="New Event Name"
          />
          <button className="add-event-btn" onClick={addEvent}>Add Event</button>
        </div>

        {/* Feedback Message */}
        {feedbackMessage && <div className="feedback-message" role="alert">{feedbackMessage}</div>}

        {/* Events List Card */}
        {events[date.toISOString().split('T')[0]] && (
          <div className="events-list-card">
            <ul className="events-list">
              {events[date.toISOString().split('T')[0]].map((eventName, index) => (
                <li key={index} className="event-item">
                  {eventName}
                  <button className="remove-event-btn" onClick={() => removeEvent(date.toISOString().split('T')[0], eventName)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
