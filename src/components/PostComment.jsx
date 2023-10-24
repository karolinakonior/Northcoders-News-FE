import { UsernameContext } from "../context/username-context";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { postComment } from "../api/api";
import Card from 'react-bootstrap/Card';


const PostComment = ({article_id, comments, setComments}) => {

    const {username, setUsername} = useContext(UsernameContext)
    const [commentBody, setCommentbody] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("")
        setMessage("")
        return postComment(article_id, username, commentBody)
        .then((response) => {
          setCommentbody("")
            setComments((currentComments) => {
                return [ response.data.comment, ...currentComments]
            })
          setMessage("Comment sucessfully added!")
        })
        .catch((error) => {
          setError("Something went wrong, please try again.")
        })
    };

    const handleChange = (event) => {
        setCommentbody(event.target.value) 
    }

    return ( 
        <>
        <Form onSubmit={handleSubmit} style={{ paddingLeft: '1rem', paddingBottom: '1rem'}}>
      <Row className="mb-3" >
        <Form.Group style={{ width: '30rem'}}>
          <Form.Label style={{ paddingTop: '2rem', fontSize: "2rem"}}>
          <Card.Title>Enter your comment</Card.Title>
            </Form.Label>
          <Form.Control rows={3} as="textarea"
            required
            type="text"
            placeholder="Add comment..."
            value={commentBody || ""}
            onChange={handleChange}
            style={{height: "8rem"}}
          />
          </Form.Group>
          </Row>
          <Button variant="dark" type="submit">Add comment</Button>
          <section style={{ paddingTop: '1rem', fontSize: "1.5rem"}}>
          </section>
          {error ? <Card.Title>{error}</Card.Title> : null}
          {message ? <Card.Title>{message}</Card.Title> : null}
          </Form>
        </>
     );
}
 
export default PostComment;