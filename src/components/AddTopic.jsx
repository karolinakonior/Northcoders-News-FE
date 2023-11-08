import { UsernameContext } from "../context/username-context";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { postTopic } from "../api/api";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const AddTopic = ({ topicToAdd, setTopicToAdd }) => {
    const [description, setDescription] = useState("")
    const [topic, setTopic] = useState("")
    const { username, setUsername } = useContext(UsernameContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const nav = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        if (/^[\s]+$/.test(topicToAdd) || (/^[\s]+$/.test(description)) || description.length === 0 || topicToAdd.length === 0) {
            setError("Topic or description is empty. Please try again.")
        } else {
            postTopic(topicToAdd, description)
                .then(response => {
                    setTopicToAdd("")
                    setDescription("")
                    setTopic("")
                    setMessage("Your topic was posted successfully!")
                    setError("")
                })
                .catch((error) => {
                    console.log(error)
                    setError("Something went wrong, please try again.")
                })
        }
    };


    return (
        <>
            {username ?
                <Form noValidate onSubmit={handleSubmit} style={{ paddingBottom: "2rem" }}>
                    <Row style={{ width: "100%" }} >
                        <Form.Group>
                            <Form.Label htmlFor="topicToAdd"><Card.Title style={{ paddingTop: '2rem', fontSize: "1.5rem" }}>Topic</Card.Title></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="topic"
                                placeholder="Topic"
                                onChange={(e) => setTopicToAdd(e.target.value)}
                                value={topicToAdd || ""}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} style={{ width: "100%" }}>
                            <Form.Label htmlFor="article"><Card.Title style={{ paddingTop: '1rem', fontSize: "1.5rem" }}>Description</Card.Title></Form.Label>
                            <Form.Control as="textarea"
                                type="text"
                                id="description"
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description || ""}
                                style={{ height: "10rem" }}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please provide description.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Button type="submit" variant="dark" >Add topic</Button>
                    {message ? <Card.Title style={{ paddingTop: '1rem', fontSize: "1rem" }}>{message}</Card.Title> : null}
                    {error ? <Card.Title style={{ paddingTop: '1rem', fontSize: "1rem" }}>{error}</Card.Title> : null}
                </Form>
                : <Card.Title style={{ paddingTop: '2rem', fontSize: "2rem" }}>Please sign in to add a topic.</Card.Title>}
        </>
    );
}

export default AddTopic;