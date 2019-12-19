//jshint esversion:8

import React from 'react';
import './App.css';
import Signup from './components/auth/Signup';

function App() {
  return (    
    <div className="App">
      <Signup username='username' />
    </div>

  );
}

export default App;
