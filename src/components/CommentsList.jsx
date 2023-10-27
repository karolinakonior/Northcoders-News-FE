import { useEffect, useState, useContext } from "react";
import { deleteComment, getComments } from '../api/api';
import Card from 'react-bootstrap/Card';
import ReactTimeAgo from 'react-time-ago';
import vote from '../images/vote-icon.png';
import Spinner from 'react-bootstrap/Spinner';
import { UsernameContext } from "../context/username-context";
import PostComment from './PostComment';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import remove from '../images/remove.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import downvote from '../images/downvote.png'
import upvote from '../images/upvote.png'
import Comment from "./Comment";


const CommentsList = ({ article_id }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { username, setUsername } = useContext(UsernameContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isDisabled, setIsDisabled] = useState(null)

    // function parseCommentCreatedAt(comment) {
    //     return Date.parse(comment.created_at);
    // }

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

    // const handleClick = (comment_id) => {
    //     setIsDisabled(true)
    //     setMessage("Comment is being deleted - please wait.")
    //     deleteComment(comment_id)
    //         .then(() => {
    //             getComments(article_id)
    //                 .then((response) => {
    //                     setIsLoading(false)
    //                     setComments(response.data.comments)
    //                     setMessage("Comment succesfully deleted!")
    //                 })
    //                 .catch((error) => {
    //                     setError("Something went wrong, please try again.")
    //                 })
    //         })
    // }

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
                        return <Comment key={comment.comment_id} comment_id={comment.comment_id} votes={comment.votes} created_at={comment.created_at} author={comment.author} body={comment.body} article_id={article_id} comments={comments} setComments={setComments}/>
                    })}
                </ul>
{/* 
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

                            <section className="container">
                                <section className="wrapper">

                                    <section className="box a">
                                       
                                            <img style={{ color: "white", height: "1.5rem" }} id="comment-icon" src={upvote} alt="Image representing votes count" />
                                            <img style={{ color: "white", height: "1.5rem" }} id="comment-icon" src={downvote} alt="Image representing votes count" />
                                            <b style={{paddingLeft: "0.5rem"}}>{comment.votes}</b>
                                    </section>

                                    <section className="box b">
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{username ? (username === comment.author ? "Delete" : "You can delete only your comment!") : "Sign in to delete"}</Tooltip>}>
                                            <button className="button" onClick={(() => { handleClick(comment.comment_id) })} 
                                            disabled={username === comment.author && isDisabled ? false : true}>
                                                <img id="remove-icon" src={remove} style={{ color: "white", height: "1.5rem" }} alt="Image representing delete icon" /></button>
                                        </OverlayTrigger>
                                    </section>
                                </section>
                            </section>

                        </Card.Body>
                    </Card>
                )
            })} */}
        </>
    );
}

export default CommentsList;