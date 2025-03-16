// src/Chatbot.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chatbot.css'; // Ensure you import the CSS file

interface Response {
  text: string;
  isUser: boolean; // Correctly define the property to indicate if the message is from the user
}

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<Response[]>([]); // Use the Response interface

  const handleSendMessage = async () => {
    if (!message) return;

    // Add user message to responses
    setResponses((prev) => [...prev, { text: `You: ${message}`, isUser: true }]);
    setMessage(''); // Clear the input field

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message,
      });
      // Add bot response with emoji to responses
      setResponses((prev) => [
        ...prev,
        { text: `Bot: ${response.data.response} 🤖`, isUser: false }, // Adding emoji to bot's response
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Chatbot</h1>
      <div className="chatbox">
        {responses.map((resp, index) => (
          <div key={index} className={resp.isUser ? 'user-message' : 'bot-message'}>
            {resp.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="send-icon"
          onClick={handleSendMessage}
          style={{
            cursor: 'pointer',
            marginLeft: '10px',
            fontSize: '24px',
          }} // Adjust size and margin as needed
        />
      </div>
    </div>
  );
};

export default Chatbot;
