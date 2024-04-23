import React from 'react';

const Chat = () => {
  // Static data for chatbox
  const messages = [
    { id: 1, name: 'John Doe', message: 'Hey, how are you?' },
    { id: 2, name: 'Jane Smith', message: 'Are you attending the event?' },
    // Add more static messages as needed
  ];

  return (
    <div className="chatBox">
      {messages.map(msg => (
        <div key={msg.id} className="message">
          <strong>{msg.name}</strong>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
