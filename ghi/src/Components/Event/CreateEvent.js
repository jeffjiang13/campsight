
import { useAddEventMutation } from '../../app/eventApi'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function CreateEvent() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [addEvent] = useAddEventMutation();

    async function submitHandler(e) {
        e.preventDefault();

        const body = {
            name: name,
            date: date,
            location: location,
            description: description,
        };

        addEvent(body);
        navigate("/events");
    }

    function nameChangeHandler(e) {
        setName(e.target.value);
    }
    function dateChangeHandler(e) {
        setDate(e.target.value);
    }
    function locationChangeHandler(e) {
        setLocation(e.target.value);
    }
    function descriptionChangeHandler(e) {
        setDescription(e.target.value);
    }
    return (
        <div className="login" >
            <Container>
                <div className="loginText">
                    <h2>Create Event</h2>
                </div>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Control
                            onChange={nameChangeHandler}
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="date"
                            placeholder="Enter Date"
                            name="date"
                            onChange={dateChangeHandler}
                            value={date}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter Location"
                            onChange={locationChangeHandler}
                            value={location}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Describe Event"
                            onChange={descriptionChangeHandler}
                            as="textarea"
                            rows={3}
                            value={description}
                        />
                    </Form.Group>
                    <div>
                        <button className="createAccountBtn" type="submit" onClick={submitHandler}>
                            Submit
                        </button>
                    </div>
                </Form>
            </Container>
        </div>

    );
}
export default CreateEvent
