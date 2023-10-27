import { getArticles } from "../api/api";
import { useEffect, useState, useContext } from "react";
import ArticleCard from "./ArticleCard";
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom"
import { getArticlesByTopic } from "../api/api"
import SortArticles from "./SortArticles";
import { useNavigate } from "react-router-dom";
import { TopicContext } from "../context/topic-context";
import { getTopics } from "../api/api";

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    //onst [validTopics, setValidTopics] = useState([])
    const { topic } = useParams()
    const [error, setError] = useState("")
    const nav = useNavigate();
    const { topics, setTopics } = useContext(TopicContext)

    const validTopics = ["football", "coding", "cooking"]

    useEffect(() => {
        setIsLoading(true)
            if (topic) {
                if(!validTopics.includes(topic)) {
                    nav('/topicerror')
                } else {
                    getArticlesByTopic((topic))
                    .then(response => {
                        setIsLoading(false)
                        setArticles(response.data.articles)
                        setError("")
                    })
                    .catch((error) => {
                        setError("Something went wrong, please try again.")
                    })
                }
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
            <div style={{ paddingTop: "2rem", size: "20rem" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p style={{paddingTop: "3rem"}}>Please wait - the articles are taking longer to load on a first render.</p>
            </div>
        </>
    }

    return (
        <>
            <div id="article">
                {error ? <p>{error}</p> : null}
                <section id="articles-title-block">
                    <h1 id="articles-title" style={{ paddingLeft: "12rem" }}>{topic ? topic.toUpperCase() : null} ARTICLES</h1>
                <SortArticles id="articles-sortby"articles={articles} setArticles={setArticles} topic={topic} />
                </section>
                <ul className="flex" style={{ paddingLeft: "12rem" }}>
                    {articles.map(article => {
                        return <ArticleCard key={article.article_id} comment_count={article.comment_count} title={article.title} author={article.author} created_at={article.created_at} votes={article.votes} article_img_url={article.article_img_url} article_id={article.article_id} topic={article.topic} />
                    })}
                </ul>
            </div>
        </>
    );
}

export default Articles;