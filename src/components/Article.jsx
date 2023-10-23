import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../api/api';
import Card from 'react-bootstrap/Card';
import user from '../images/user-icon.png'
import clock from '../images/clock-icon.png'
import comment from '../images/comment-icon.png'
import vote from '../images/vote-icon.png'
import Spinner from 'react-bootstrap/Spinner';
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import CommentsList from './CommentsList';

const Article = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
            .then((response) => {
                setIsLoading(false)
                setArticle(response.data.article)
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
            <div id="article">
                <Card.Title style={{ padding: '0.5rem', margin: '1rem', 'font-size': '2rem' }}>{article.title}</Card.Title>
                <Card id="article-card" style={{ width: '80%' }}>
                    <Card.Body>

                        <div className="container">
                            <div className="wrapper">
                                <div class="box a">
                                    <Card.Subtitle className="mb-2 text-muted" style={{ padding: '0.5rem' }}>
                                        <img id="comment-icon" src={user} alt="Image representing a user" />{" "} {article.author}
                                    </Card.Subtitle>
                                </div>
                                <div class="box b">
                                    {" "}
                                    <img id="comment-icon" src={clock} alt="Image representing a clock" />{" "}
                                    <ReactTimeAgo date={article.created_at} locale="en-US" />
                                </div>
                            </div>
                        </div>
                        <Card.Img src={article.article_img_url} alt="Image corresponding to the article topic" ></Card.Img>
                        <Card.Text style={{ padding: '0.5rem' }}>
                            {article.body}
                        </Card.Text>

                        <div class="container">
                            <div class="wrapper">
                                <div class="box a">
                                    <Card.Subtitle style={{ padding: '0.5rem' }} className="mb-2 text-muted">
                                        <img id="comment-icon" src={vote} alt="Image representing votes count" />{article.votes} {" "}{" "}
                                    </Card.Subtitle>
                                </div>
                                <div class="box b">
                                    <img id="comment-icon" src={comment} alt="Image representing a comment" />{article.comment_count}
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                    <CommentsList article_id={article_id}/>
                </Card>
            </div>
        </>
    );
}

export default Article;