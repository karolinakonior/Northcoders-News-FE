import { UsernameContext } from "../context/username-context";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { postArticle } from "../api/api";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';


const PostArticle = ({ topics }) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [topic, setTopic] = useState("")
    const { username, setUsername } = useContext(UsernameContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const nav = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        if (/^[\s]+$/.test(title) || (/^[\s]+$/.test(body))) {
            setError("Title or article body is empty. Please try again.")
        } else {
            postArticle(title, topic, body, username)
                .then(response => {
                    setTitle("")
                    setBody("")
                    setTopic("")
                    setMessage("Your article was posted successfully!")
                    nav(`/articles/${topic}/article/${response.data.article.article_id}`)
                })
                .catch((error) => {
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
                            <Form.Label htmlFor="title"><Card.Title style={{ paddingTop: '2rem', fontSize: "1.5rem" }}>Title</Card.Title></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="title"
                                placeholder="Title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title || ""}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group style={{ paddingTop: '1rem', fontSize: "1.5rem", width: "100%" }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Topic
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {topics.map((topic, index) => {
                                        return <Dropdown.Item key={index} required onClick={() => { setTopic(topic.slug) }}>{topic.slug.toUpperCase()}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                            {topic.toUpperCase()}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} style={{ width: "100%" }}>
                            <Form.Label htmlFor="article"><Card.Title style={{ paddingTop: '1rem', fontSize: "1.5rem" }}>Article</Card.Title></Form.Label>
                            <Form.Control as="textarea"
                                type="text"
                                id="article"
                                placeholder="Article"
                                onChange={(e) => setBody(e.target.value)}
                                value={body || ""}
                                style={{ height: "20rem" }}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please provide article body.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Button type="submit" variant="dark" >Add article</Button>
                    {message ? <Card.Title style={{ paddingTop: '1rem', fontSize: "1rem" }}>{message}</Card.Title> : null}
                    {error ? <Card.Title style={{ paddingTop: '1rem', fontSize: "1rem" }}>{error}</Card.Title> : null}
                </Form>
                : <Card.Title style={{ paddingTop: '2rem', fontSize: "2rem" }}>Please sign in to post an article.</Card.Title>}
        </>
    );
}

export default PostArticle;