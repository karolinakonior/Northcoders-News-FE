import { useEffect, useState, useContext } from "react";
import { getComments } from '../api/api';
import Card from 'react-bootstrap/Card';
import ReactTimeAgo from 'react-time-ago'
import vote from '../images/vote-icon.png'
import Spinner from 'react-bootstrap/Spinner';
import { UsernameContext } from "../context/username-context";
import PostComment from './PostComment';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const CommentsList = ({ article_id }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {username, setUsername} = useContext(UsernameContext)

    function parseCommentCreatedAt(comment){
        return Date.parse(comment.created_at);
    }

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id)
            .then((response) => {
                setIsLoading(false)
                setComments(response.data.comments)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    if (isLoading) {
        return <>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4>Loading...</h4>
        </>
    }

    return (
        <>
            {username ? <PostComment article_id={article_id} comments={comments} setComments={setComments} /> : <Button variant="dark"><Link style={{color: "white", textDecoration: "none"}} to="/signin">Sign in to post a comment!</Link></Button>}
            {comments.map((comment) => {
                return (
                    <Card style={{ width: '100%' }} key={comment.comment_id}>
                        <Card.Body>
                            <section className="container">
                                <section className="wrapper">
                                    <section className="box a">
                                        <Card.Title>{comment.author}</Card.Title>
                                    </section>
                                    <section className="box b">
                                        <Card.Subtitle className="mb-2 text-muted"><ReactTimeAgo date={parseCommentCreatedAt(comment)} locale="en-US" /></Card.Subtitle>
                                    </section>
                                </section>
                            </section>
                            <Card.Text>
                                {comment.body}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">
                                <img id="comment-icon" src={vote} alt="Image representing votes count" />{comment.votes}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                )
            })}
        </>
    );
}

export default CommentsList;