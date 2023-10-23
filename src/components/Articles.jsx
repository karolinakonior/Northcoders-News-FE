import { getArticles } from "../api/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Spinner from 'react-bootstrap/Spinner';

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getArticles()
            .then((response) => {
                setIsLoading(false)
                setArticles(response.data.articles)
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
            <h1 id="articles-title">ARTICLES</h1>
            <ul>
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} comment_count={article.comment_count} title={article.title} author={article.author} created_at={article.created_at} votes={article.votes} article_img_url={article.article_img_url} article_id={article.article_id} />
                })}
            </ul>
            </div>
        </>
    );
}

export default Articles;