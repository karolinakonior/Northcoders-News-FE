import Card from 'react-bootstrap/Card';
import { useEffect, useState, useContext } from "react";
import { deleteComment, getComments, changeCommentVotes } from '../api/api';
import ReactTimeAgo from 'react-time-ago';
import Spinner from 'react-bootstrap/Spinner';
import { UsernameContext } from "../context/username-context";
import remove from '../images/remove.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import downvote from '../images/downvote.png';
import upvote from '../images/upvote.png';
import clock from '../images/clock-icon.png';
import user from '../images/user-icon.png';

const Comment = ({ comment_id, votes, created_at, author, author_image_url, body, article_id, comments, setComments }) => {
    const [isLoading, setIsLoading] = useState(true)
    const { username, setUsername } = useContext(UsernameContext)
    const [isDisabled, setIsDisabled] = useState(null)
    const [message, setMessage] = useState("")
    const [commentVotes, setCommentVotes] = useState(votes)
    const [error, setError] = useState("")
    const [isSubtractDisabled, setIsSubtractDisabled] = useState(false);
    const [userVotes, setUserVotes] = useState(0)
    const [isAddDisabled, setIsAddDisabled] = useState(false);

    function parseCommentCreatedAt(created_at) {
        return Date.parse(created_at);
    }

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

    const handleClick = (comment_id) => {
        setIsDisabled(true)
        setMessage("Comment is being deleted - please wait.")
        deleteComment(comment_id)
            .then(() => {
                getComments(article_id)
                    .then((response) => {
                        setIsLoading(false)
                        setComments(response.data.comments)
                        setMessage("Comment succesfully deleted!")
                    })
                    .catch((error) => {
                        setError("Something went wrong, please try again.")
                    })
            })
    }

    const handleVote = (vote) => {
        setCommentVotes((commentVotes + vote));

        handleUserVotes(vote);

        return changeCommentVotes(comment_id, vote)
            .catch((error) => {
                setCommentVotes((currentVotes) => {
                    setError('Something went wrong, please try again.');
                    return currentVotes += vote;
                })
            })
    }

    const handleUserVotes = (vote) => {
        if (userVotes + vote > 0) {
            setIsAddDisabled(true);
            setIsSubtractDisabled(false)
        } else if (userVotes + vote < 0) {
            setIsAddDisabled(false)
            setIsSubtractDisabled(true)
        } else {
            setIsAddDisabled(false)
            setIsSubtractDisabled(false)
        }
        setUserVotes((userVotes + vote));
    }

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
            <Card key={comment_id}>
                <Card.Body >
                    <section className="container">
                        <section className="wrapper">
                            <section className="box a">
                                <img style={{ height: "1.5rem" }} src={author_image_url} alt="Image representing a user" /><b style={{ paddingLeft: "0.5rem" }}>{author}</b>
                            </section>
                            <section className="box b">
                                <img style={{ height: "1.5rem" }} src={clock} alt="Image representing a clock" />
                                <b style={{ paddingLeft: "0.5rem" }}><ReactTimeAgo date={parseCommentCreatedAt(created_at)} locale="en-US" /></b>
                            </section>
                        </section>
                    </section>
                    <Card.Text>
                        {body}
                    </Card.Text>
                    <section className="container">
                        <section className="wrapper">
                            <section className="box a">
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{username ? "Upvote" : "Sign in to vote!"}</Tooltip>}>
                                    <button className="button" id={isAddDisabled ? "button-disabled" : ""} disabled={username ? isAddDisabled : true} onClick={(() => { handleVote(1) })} >
                                        <img style={{ color: "white", height: "1.5rem" }} id="comment-icon" src={upvote} alt="Image representing votes count" />
                                    </button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{username ? "Downvote" : "Sign in to vote!"}</Tooltip>}>
                                    <button id={isSubtractDisabled ? "button-disabled" : ""} disabled={username ? isSubtractDisabled : true} onClick={(() => { handleVote(-1) })}>
                                        <img style={{ color: "white", height: "1.5rem" }} id="comment-icon" src={downvote} alt="Image representing votes count" />
                                    </button>
                                </OverlayTrigger>
                                <b style={{ paddingLeft: "0.5rem" }}>{commentVotes}</b>
                                {error ? <p>{error}</p> : null}
                            </section>
                            <section className="box b">
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{username ? (username === author ? "Delete" : "You can delete only your comment!") : "Sign in to delete"}</Tooltip>}>
                                    <button className="button" onClick={(() => { handleClick(comment_id) })}
                                        disabled={username === author && isDisabled ? false : true}>
                                        <img id="remove-icon" src={remove} style={{ color: "white", height: "1.5rem" }} alt="Image representing delete icon" /></button>
                                </OverlayTrigger>
                            </section>
                        </section>
                    </section>
                </Card.Body>
            </Card>
        </>
    );
}

export default Comment;