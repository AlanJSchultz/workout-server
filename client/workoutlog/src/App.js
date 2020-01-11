//jshint esversion:6

import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Sitebar from './components/navbar/Navbar';
import WorkoutIndex from './components/workout/WorkoutIndex';

function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const cleartoken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(newToken);
  };

  const protectedViews = () => {
    return (
      localStorage.getItem('token') === sessionToken ? <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken} />
    );
  };

  return (    
    <div className="App">
      <Sitebar clickLogout={cleartoken}/>
      {protectedViews()}
    </div>

  );
}

export default App;
