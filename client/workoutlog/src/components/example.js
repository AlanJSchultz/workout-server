import React, { useState } from 'react';
import './example.css';
import { Container, Row, Col } from 'reactstrap';

function Example() {

    let [username, setUsername,] = useState('');

    return (
        <Container>
            <Row>
                <h2>Sign In</h2>
                <Col sm="6">
                    <input onChange={(e) => {setUsername(e.target.value)}} type="text" name="username" />
                </Col>
                <Col sm="6"><h3>Welcome to React</h3></Col>
            </Row>
            <h1>
                {username}
            </h1>
        </Container>
    )
}

export default Example;
