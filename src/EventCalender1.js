import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Cal.css'; 
import { FaHome } from 'react-icons/fa'; // Ensures Cal.css is applied
import { FaCalendar, FaConnectdevelop, FaSignOutAlt, FaBook } from 'react-icons/fa';
import {  Menu, MenuItem} from 'react-pro-sidebar'
import { useNavigate } from 'react-router-dom';
import {  auth } from './firebase-config';
import { signOut } from 'firebase/auth'; // Import signOut for Firebase v9+



const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEventName, setNewEventName] = useState('');
  
  const navigate = useNavigate(); 

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const addEvent = () => {
    const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    if (newEventName.trim() !== '') {
      const newEvents = { ...events, [dateString]: [...(events[dateString] || []), newEventName] };
      setEvents(newEvents);
      setNewEventName(''); // Reset input
    }
  };

  const removeEvent = (eventDate, eventName) => {
    const updatedEvents = { ...events };
    updatedEvents[eventDate] = updatedEvents[eventDate].filter(event => event !== eventName);
    if (updatedEvents[eventDate].length === 0) {
      delete updatedEvents[eventDate]; // Remove the date if no events are left
    }
    setEvents(updatedEvents);
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

  // Apply a unique class to the top-level div
  return (
    <div className='calendarMain'>
       <div className="menu-bar">
        <Menu iconShape="square">
          <MenuItem icon={<FaHome />} onClick={() => navigate('/home')}>Home</MenuItem>
          <MenuItem icon={<FaCalendar />}onClick={() => navigate('/calender')}>Calendar</MenuItem>
          <MenuItem icon={<FaConnectdevelop />} onClick={() => navigate('/connect')}>Connect</MenuItem>
          <MenuItem icon={<FaBook />} onClick={() => navigate('/home')}>Courses</MenuItem>
          <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    </div>
    <div className="event-calendar-container">
      <Calendar onChange={handleDateChange} value={date} />
      <input
        type="text"
        value={newEventName}
        onChange={(e) => setNewEventName(e.target.value)}
        placeholder="New Event Name"
      />
      <button onClick={addEvent}>Add Event</button>
      {events[date.toISOString().split('T')[0]] && (
        <ul>
          {events[date.toISOString().split('T')[0]].map((eventName, index) => (
            <li key={index}>
              {eventName}
              <button onClick={() => removeEvent(date.toISOString().split('T')[0], eventName)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default EventCalendar;
