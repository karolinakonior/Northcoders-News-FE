import { getArticles } from "../api/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom"
import { getArticlesByTopic } from "../api/api"
import SortArticles from "./SortArticles";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import getUserIconUrl from '../helpers/usersHelper';

const Articles = ({ users }) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { topic } = useParams();
    const [error, setError] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        if (topic) {
            getArticlesByTopic((topic))
                .then(response => {
                    setIsLoading(false)
                    setArticles(response.data.articles)
                    setError("")
                })
                .catch((error) => {
                    if (error.code === 'ERR_BAD_REQUEST') {
                        nav(`/error`)
                    }
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
            <div style={{ paddingTop: "2rem", size: "20rem" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p style={{ paddingTop: "3rem" }}>Please wait - the articles are taking longer to load on a first render.</p>
            </div>
        </>
    }

    return (
        <>
            <div id="article">
                {error ? <p>{error}</p> : null}
                <section id="articles-title-block">
                    <h1 id="articles-title">{topic ? topic.toUpperCase() : null} ARTICLES</h1>
                    <SortArticles id="articles-sortby" setArticles={setArticles} topic={topic} />
                </section>
                <Row gutter={40}>
                    {(articles).map(article =>
                        <Col key={article.article_id} style={{ marginBottom: "1.5rem" }}
                            xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }}
                            lg={{ span: 6 }} xl={{ span: 4 }}
                        ><ArticleCard comment_count={article.comment_count}
                            title={article.title}
                            author={article.author}
                            author_image_url={getUserIconUrl(users, article.author)}
                            created_at={article.created_at}
                            votes={article.votes}
                            article_img_url={article.article_img_url}
                            article_id={article.article_id}
                            topic={article.topic} /></Col>
                    )}
                </Row>
            </div>
        </>
    );
}

export default Articles;