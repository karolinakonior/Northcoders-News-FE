import { UsernameContext } from "../context/username-context";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { postArticle } from "../api/api";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';


const PostArticle = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [topic, setTopic] = useState("")
    const { username, setUsername } = useContext(UsernameContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const nav = useNavigate()
  
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
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
    };
   

    return (
        <>
           {username ? 
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label><Card.Title style={{ paddingTop: '2rem', fontSize: "1.5rem" }}>Article title</Card.Title></Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label><Card.Title style={{ paddingTop: '1rem', fontSize: "1.5rem" }}>Topic</Card.Title></Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Topic"
            onChange={(e) => setTopic(e.target.value)}
            value={topic || ""}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label><Card.Title style={{ paddingTop: '1rem', fontSize: "1.5rem" }}>Article</Card.Title></Form.Label>
          <Form.Control as="textarea"
          type="text" 
          placeholder="Article" 
          onChange={(e) => setBody(e.target.value)}
          value={body || ""}
          style={{ height: "20rem"}}
          required />
          <Form.Control.Feedback type="invalid">
            Please provide article body.
          </Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      <Button type="submit">Add article</Button>
      {message ? message : null}
      {error ? error : null}
    </Form>
 : <Card.Title style={{ paddingTop: '2rem', fontSize: "2rem" }}>Please sign in to post an article.</Card.Title>}
        </>
    );
}

export default PostArticle;