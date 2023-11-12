import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import comment from '../images/comment-icon.png'
import vote from '../images/vote-icon.png'
import clock from '../images/clock-icon.png'
import { Link } from 'react-router-dom';
import Article from './Article';
import { Routes, Route } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'


const ArticleCard = ({ topic, article_id, comment_count, title, author, author_image_url, created_at, votes, article_img_url }) => {

    const createdAt = Date.parse(created_at);

    return (
        <>
            <Card id="article-card">
                <Card.Body>
                    <Link to={`article/${article_id}`} style={{ color: 'black', 'textDecoration': 'none' }}>
                        <section className="flex-space-between " style={{ marginBottom: "0.5rem" }}>
                            <section>
                                <Image style={{ height: "1.5rem" }} src={author_image_url} alt="Image representing a user" />
                                <b style={{ marginLeft: "0.5rem" }}>{author}</b>
                            </section>
                            <section>
                                <Image style={{ height: "1.5rem" }} src={clock} alt="Image representing a clock" />
                                <ReactTimeAgo date={createdAt} style={{ fontWeight: "bold", marginLeft: "0.25rem" }} />
                            </section>
                        </section>

                        <Card.Img src={article_img_url} alt="Image corresponding to the article topic"></Card.Img>
                        <section className="flex-center-align" style={{ height: "5rem" }}>
                            <Card.Title>{topic.toUpperCase()}: {title}</Card.Title>
                        </section>
                        <section className="flex-space-between ">
                            <section>
                                <Image style={{ height: "1.5rem", marginRight: "0.25rem" }} src={vote} alt="Image representing votes count" />
                                <b>{votes}</b>
                            </section>
                            <section>
                                <Image style={{ height: "1.5rem" }} src={comment} alt="Image representing a comment" />
                                <b style={{ marginLeft: "0.25rem" }}>{comment_count}</b>
                            </section>
                        </section>
                    </Link>
                </Card.Body>
            </Card >

            <Routes>
                <Route path="articles/:article_id" element={<Article />} />
            </Routes>
        </>
    );
}

export default ArticleCard;