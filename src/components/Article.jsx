import { useEffect, useState } from 'react';
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
import { addArticleVotes } from '../api/api';
import { subtractArticleVotes } from '../api/api';

const Article = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [articleVotes, setArticleVotes] = useState(0)
    const [isAddDisabled, setIsAddDisabled] = useState(false);
    const [isSubtractDisabled, setIsSubtractDisabled] = useState(false);
    const [request, setRequest] = useState(true)

    const createdAt = Date.parse(article.created_at);

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
            .then((response) => {
                setIsLoading(false)
                setArticle(response.data.article)
                setArticleVotes(response.data.article.votes)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const increaseVotes = (event) => {
        return addArticleVotes(article_id)
            .then((response) => {
                if (response.status === 200) {
                    setArticleVotes((currentVotes) => {
                        return currentVotes + 1;
                    })
                    setIsAddDisabled(true);      
                } else {
                    setRequest(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const decreaseVotes = () => {
        return subtractArticleVotes(article_id)
            .then((response) => {
                if (response.status === 200) {
                    setArticleVotes((currentVotes) => {
                        return currentVotes - 1;
                    })
                 setIsSubtractDisabled(true)
                } else {
                    setRequest(false);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
            <section id="article">
                <Card.Title style={{ padding: '0.5rem', margin: '1rem', 'fontSize': '2rem', width: '80%' }}>{article.topic.toUpperCase()}: {article.title}</Card.Title>
                <Card id="article-card" style={{ width: '80%' }}>
                    <Card.Body>
                        <section className="container">
                            <section className="wrapper">
                                <section className="box a">
                                        <img style={{ height: "2rem" }} src={user} alt="Image representing a user" /><b style={{paddingLeft: "0.5rem"}}>{article.author}</b>
                              
                                </section>
                                <section className="box b">

                                    <img style={{ height: "2rem" }} src={clock} alt="Image representing a clock" />
                                    <b style={{paddingLeft: "0.5rem"}}>
                                    <ReactTimeAgo date={createdAt} locale="en-US" />
                                    </b>
                                </section>
                            </section>
                        </section>
                        <Card.Img src={article.article_img_url} alt="Image corresponding to the article topic" ></Card.Img>
                        <Card.Text style={{ "paddingTop": '0.5rem' }}>
                            {article.body}
                        </Card.Text>
                        <section className="container">
                            <section className="wrapper">
                                <section className="box a">
                                
                                    <button className="button" id={isAddDisabled ? "button-disabled" : ""} disabled={isAddDisabled} onClick={increaseVotes}>
                                        <img style={{ height: "2rem" }} src={upvote} alt="Image representing votes count" /></button>
                                    <button id={isSubtractDisabled ? "button-disabled" : ""} disabled={isSubtractDisabled} onClick={decreaseVotes}>
                                        <img style={{ height: "2rem" }}  src={downvote} alt="Image representing votes count" />
                                    </button>
                                    <b style={{paddingLeft: "0.5rem"}}>{articleVotes}</b>
                                    {request ? "" : <p>Something went wrong...</p>}
                                </section>
                                <section className="box b">
                                    <img style={{ height: "2rem" }} id="comment-icon" src={comment} alt="Image representing a comment" />
                                    <b style={{paddingLeft: "0.5rem"}}>{article.comment_count}</b>
                                </section>
                            </section>
                        </section>
                    </Card.Body>
                    <CommentsList article_id={article_id} />
                </Card>
            </section>
        </>
    );
}

export default Article;