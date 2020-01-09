//jshint esversion:6

import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Sitebar from './components/navbar/Navbar';

function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken)
    setSessionToken(newToken)
    console.log(newToken)
  };

  return (    
    <div className="App">
      <Sitebar />
      <Auth updateToken={updateToken} />
    </div>

  );
}

export default App;
