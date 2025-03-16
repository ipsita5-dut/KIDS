// src/App.tsx
import React from 'react';
import './App.css'; // Import the CSS file
import Chatbot from './Chatbot';
import NavBar from './NavBar';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div>
      <div className="overlay"></div> 
      <NavBar/>
      <Chatbot />
      <Footer/>
    </div>
  );
};

export default App;