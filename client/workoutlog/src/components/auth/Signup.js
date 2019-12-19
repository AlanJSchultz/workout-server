//jshint esversion:8

import React, {useState} from 'react';
import './Signup.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Signup(props) {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:3000/api/user", {
            method: 'POST',
            body: JSON.stringify({ user: { username: username, password: password } }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(
            (response) => console.log(response)
        );
        
    };
    
    return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input onChange={(e) => { setUsername(e.target.value) }} name="username" value={username} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" value={password} />
        </FormGroup>
        <Button type="submit">Signup</Button>
      </Form>
    </div>
  )
}

export default Signup;
