import { useEffect, useState, useContext } from "react";
import { deleteComment, getComments } from '../api/api';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { UsernameContext } from "../context/username-context";
import PostComment from './PostComment';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Comment from "./Comment";
import getUserIconUrl from '../helpers/usersHelper';

const CommentsList = ({ users, article_id }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { username, setUsername } = useContext(UsernameContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isDisabled, setIsDisabled] = useState(null)

    useEffect(() => {
        setIsDisabled(true)
        setIsLoading(true)
        getComments(article_id)
            .then((response) => {
                setIsLoading(false)
                setComments(response.data.comments)
            })
            .catch((error) => {
                setError("Something went wrong, please try again.")
            })
    }, [])

    if (isLoading) {
        return <>
            <div style={{ paddingTop: "2rem", paddingLeft: "2rem", size: "20rem" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </>
    }

    return (
        <>
            {username ? <PostComment article_id={article_id} comments={comments} setComments={setComments} /> : <Button variant="dark"><Link style={{ color: "white", textDecoration: "none" }} to="/signin">Sign in to post a comment!</Link></Button>}
            <Card.Title className="card-title h5" style={{ paddingLeft: '1rem', paddingBottom: '1rem' }}>{message ? message : null}</Card.Title>
            <Card.Title className="card-title h5" style={{ paddingLeft: '1rem', paddingBottom: '1rem' }}>{error ? error : null}</Card.Title>

            <ul className="comment-body">
                    {comments.map(comment => {
                        return <Comment key={comment.comment_id} 
                        comment_id={comment.comment_id} 
                        votes={comment.votes} 
                        created_at={comment.created_at} 
                        author={comment.author}
                        author_image_url={getUserIconUrl(users, comment.author)} 
                        body={comment.body} 
                        article_id={article_id} 
                        comments={comments} 
                        setComments={setComments}/>
                    })}
                </ul>
        </>
    );
}

export default CommentsList;