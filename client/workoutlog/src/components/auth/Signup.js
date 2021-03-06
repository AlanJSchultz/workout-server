//jshint esversion:8

import React, {useState} from 'react';
import './Signup.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Signup(props) {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:5000/api/user", {
            method: 'POST',
            body: JSON.stringify({ user: { username: username, password: password } }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
          .then(
            (response) => response.json()
          )
          .then(user => props.updateToken(user.sessionToken));
        
    };
    
    return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input onChange={(e) => { setUsername(e.target.value) }} placeholder='username' name="username" value={username} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input onChange={(e) => { setPassword(e.target.value) }} placeholder='password' type="password" name="password" value={password} />
        </FormGroup>
        <Button type="submit">Signup</Button>
      </Form>
    </div>
  )
}

export default Signup;
