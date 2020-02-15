//jshint esversion:6

// imports
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


// a function
const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [result, setResult] = useState('');
    const [definition, setDefinition] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5000/api/log', {
            method:'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({ log: { description:description , definition:definition , result:result } })
        })
            .then(res => res.json())
            .then(logData => {
                console.log(logData);
                // set user input fields to empty
                setDescription('');
                setResult('');
                setDefinition('');
                props.fetchWorkouts();
            });
    };

    return (
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description" />
                    <Input onChange={ (e) => {setDescription(e.target.value)} } name="description" value={description} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition" />
                    <Input type="select" onChange={ (e) => {setDefinition(e.target.value)} }  name="definition" value={definition}>
                        <option></option>
                        <option value="Time">Time</option>
                        <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result" />
                    <Input onChange={ (e) => {setResult(e.target.value)} }  name="result" value={result} />
                </FormGroup>
                <Button type="submit">Click to Submit</Button>
            </Form>
        </>
    )
}

// export
export default WorkoutCreate;
