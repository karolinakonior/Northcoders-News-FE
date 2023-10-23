import getArticles from "../api/getArticles";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

const Articles = () => {
    const [articles, setArticles] = useState([])


    useEffect(() => {
        getArticles()
            .then((response) => {
                setArticles(response.data.articles)
            })
    })

    return (
        <>
            <h1 id="articles-title">ARTICLES</h1>
            <ul>
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} comment_count={article.comment_count} title={article.title} author={article.author} created_at={article.created_at} votes={article.votes} article_img_url={article.article_img_url} />
                })}
            </ul>
        </>
    );
}

export default Articles;