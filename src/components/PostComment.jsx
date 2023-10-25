import { UsernameContext } from "../context/username-context";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { postComment } from "../api/api";
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const PostComment = ({article_id, comments, setComments}) => {

    const {username, setUsername} = useContext(UsernameContext)
    const [commentBody, setCommentbody] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [isDisabled, setIsAddDisabled] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("")
        setMessage("")
        setIsPosting(true)
        return postComment(article_id, username, commentBody)
        .then((response) => {
          setIsPosting(false)
          setCommentbody("")
          setIsAddDisabled(true)
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
          <OverlayTrigger overlay={ <Tooltip id="tooltip-disabled">{isDisabled ? "You already commented on this article." : "Add a comment"}</Tooltip>}>
          <Button disabled={isDisabled} variant="dark" type="submit">Add comment</Button>
          </OverlayTrigger>
          <section style={{ paddingTop: '1rem', fontSize: "1.5rem"}}>
          </section>
          {isPosting ? <Card.Title>Your comment is being posted...</Card.Title> : null}
          {error ? <Card.Title>{error}</Card.Title> : null}
          {message ? <Card.Title>{message}</Card.Title> : null}
          </Form>
        </>
     );
}
 
export default PostComment;