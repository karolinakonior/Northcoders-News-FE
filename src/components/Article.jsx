import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../api/api';
import Card from 'react-bootstrap/Card';
import user from '../images/user-icon.png'
import clock from '../images/clock-icon.png'
import comment from '../images/comment-icon.png'
import downvote from '../images/downvote.png'
import upvote from '../images/upvote.png'
import Spinner from 'react-bootstrap/Spinner';
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import CommentsList from './CommentsList';
import { changeArticleVotes } from '../api/api';
import { UsernameContext } from '../context/username-context';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";
import getUserIconUrl from '../helpers/usersHelper';

const Article = ({ users }) => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [articleVotes, setArticleVotes] = useState(0)
    const [userVotes, setUserVotes] = useState(0)
    const [isAddDisabled, setIsAddDisabled] = useState(false);
    const [isSubtractDisabled, setIsSubtractDisabled] = useState(false);
    const [err, setErr] = useState(null);
    const { username, setUsername } = useContext(UsernameContext)
    const nav = useNavigate();

    const createdAt = Date.parse(article.created_at);

    useEffect(() => {
        setIsLoading(true)
        if (/[a-z]+/i.test(article_id)) {
            nav(`/error`);
        }
        getArticle(article_id)
            .then((response) => {
                if (Object.keys(response.data).length === 0) {
                    nav(`/error`);
                } else {
                    setArticle(response.data.article)
                    setArticleVotes(response.data.article.votes)
                }
                setIsLoading(false)
            })
            .catch((err) => {
                setErr('Something went wrong, please try again.');
            })
    }, [])

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

    const handleVote = (vote) => {
        setArticleVotes((articleVotes + vote));

        handleUserVotes(vote);

        return changeArticleVotes(article_id, vote)
            .catch((err) => {
                setArticleVotes((currentVotes) => {
                    setErr('Something went wrong, please try again.');
                    return currentVotes += vote;
                })
            })
    }

    if (isLoading) {
        return <>
            <Spinner className="loading-spinner" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    }

    return (
        <>
            <Card.Title style={{ 'fontSize': '2rem', paddingBottom: "1rem" }}>{article.topic.toUpperCase()}: {article.title}</Card.Title>
            <Card id="article-card">
                <Card.Body>
                    <section className="flex-space-between" style={{ marginBottom: "0.5rem" }}>
                        <section>
                            <img style={{ height: "2rem" }} src={getUserIconUrl(users, article.author)} alt="Image representing a user" />
                            <b style={{ marginLeft: "0.5rem" }}>{article.author}</b>
                        </section>
                        <section>
                            <img style={{ height: "2rem" }} src={clock} alt="Image representing a clock" />
                            <ReactTimeAgo date={createdAt} style={{ fontWeight: "bold", marginLeft: "0.25rem" }} />
                        </section>
                    </section>
                    <Card.Img src={article.article_img_url} alt="Image corresponding to the article topic" ></Card.Img>
                    <Card.Text>
                        {article.body}
                    </Card.Text>
                    <section className="flex-space-between">
                        <section>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{username ? "Upvote" : "Sign in to vote!"}</Tooltip>}>
                                <button className="button" id={isAddDisabled ? "button-disabled" : ""} disabled={username ? isAddDisabled : true} onClick={(() => { handleVote(1) })} >
                                    <img style={{ height: "2rem" }} src={upvote} alt="Image representing votes count" /></button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{username ? "Downvote" : "Sign in to vote!"}</Tooltip>}>
                                <button id={isSubtractDisabled ? "button-disabled" : ""} disabled={username ? isSubtractDisabled : true} onClick={(() => { handleVote(-1) })}>
                                    <img style={{ height: "2rem" }} src={downvote} alt="Image representing votes count" />
                                </button>
                            </OverlayTrigger>
                            <b style={{ paddingLeft: "0.5rem" }}>{articleVotes}</b>
                            {err ? <p>{err}</p> : null}
                        </section>
                        <section>
                            <img style={{ height: "2rem" }} id="comment-icon" src={comment} alt="Image representing a comment" />
                            <b style={{ paddingLeft: "0.5rem" }}>{article.comment_count}</b>
                        </section>
                    </section>
                </Card.Body>
                <CommentsList users={users} article_id={article_id} />
            </Card>
        </>
    );
}

export default Article;