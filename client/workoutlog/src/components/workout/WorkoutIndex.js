//jshint esversion:8

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

function WorkoutIndex(props) {

    const [workouts, setWorkouts] = useState([]);

    const fetchWorkouts = () => {
        fetch('http://localhost:4000/api/log', {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": props.token
            })
        })
        .then(res => res.json())
        .then(logData => {setWorkouts(logData); console.log(logData)});
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <Container>
                <Row>
                    <Col md="3">
                        {/* Create component here */}
                    </Col>
                    <Col md="9">
                        Log a workout to see a table. This will be added later
                    </Col>
                </Row>
            </Container>
    )
}

export default WorkoutIndex;
