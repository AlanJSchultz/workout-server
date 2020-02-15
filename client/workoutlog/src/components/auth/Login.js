//jshint esversion:8

import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/user/signin', {
            method: 'POST',
            body: JSON.stringify({user: { username: username, password: password }}),
            headers: new Headers ({
                "Content-type": "application/json"
            })
        })
            .then(response => response.json())
            // .then(user => console.log(user))
            .then(user => props.updateToken(user.sessionToken));
    };

    return (
        <div>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input onChange={(e) => { setUsername(e.target.value) }} placeholder='username' name="username" value={username} />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => { setPassword(e.target.value) }} placeholder='password' type="password" name="password" value={password} />
            </FormGroup>
            <Button type="submit">Login</Button>
        </Form>
        </div>
    )
}

export default Login;
