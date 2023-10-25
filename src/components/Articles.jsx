import { getArticles } from "../api/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from "react-router-dom"
import { getArticlesByTopic } from "../api/api"

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {topic} = useParams()
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true)
        if(topic) {
            getArticlesByTopic((topic))
            .then(response => {
                setIsLoading(false)
                setArticles(response.data.articles)
                setError("")
            })
            .catch((error) => {
                setError("Something went wrong, please try again.")
            })

        } else {
            getArticles()
            .then((response) => {
                setIsLoading(false)
                setArticles(response.data.articles)
                setError("")
            })
            .catch((error) => {
                setError("Something went wrong, please try again.")
            })
        }
     
    }, [topic])

    if (isLoading) {
        return <>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    }

    return (
        <>
        <div id="article">
            {error ? <p>{error}</p> : null}
            <h1 style={{ paddingLeft: "12rem", color: "pink"}}>{topic ? topic.toUpperCase() : null} ARTICLES</h1>
            <ul style={{ paddingLeft: "12rem"}}>
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} comment_count={article.comment_count} title={article.title} author={article.author} created_at={article.created_at} votes={article.votes} article_img_url={article.article_img_url} article_id={article.article_id} topic={article.topic}/>
                })}
            </ul>
            </div>
        </>
    );
}

export default Articles;