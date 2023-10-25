import Card from 'react-bootstrap/Card';
import comment from '../images/comment-icon.png'
import vote from '../images/vote-icon.png'
import user from '../images/user-icon.png'
import clock from '../images/clock-icon.png'
import { Link } from 'react-router-dom';
import Article from './Article';
import { Routes, Route } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'


const ArticleCard = ({ topic, article_id, comment_count, title, author, created_at, votes, article_img_url }) => {

    const createdAt = Date.parse(created_at);

    return (
        <>

            <Card id="article-card" style={{ width: '90%' }} className="box box-child">

                <Card.Body>
                    <Link to={`article/${article_id}`} style={{ color: 'black', 'textDecoration': 'none' }}>
                        <section className="container">
                            <section className="wrapper">
                                <section className="box a">
                                        <img style={{ height: "1.5rem" }} src={user} alt="Image representing a user" /><b style={{ paddingLeft: "0.5rem" }}>{author}</b>
                                </section>
                                <section className="box b">
                                    <img style={{ height: "1.5rem" }} src={clock} alt="Image representing a clock" />
                                    <b style={{ paddingLeft: "0.5rem" }}>
                                        <ReactTimeAgo date={createdAt} locale="en-US" />
                                    </b>
                                </section>
                            </section>
                        </section>


                        <Card.Img src={article_img_url} alt="Image corresponding to the article topic" ></Card.Img>
                        <Card.Title style={{ padding: '0.2rem' }}>{topic.toUpperCase()}: {title}</Card.Title>
                        <section className="container">
                            <section className="wrapper">
                                <section className="box a">
                                    <img style={{ height: "1.5rem" }} src={vote} alt="Image representing votes count" />
                                    <b style={{ paddingLeft: "0.5rem" }}>{votes}</b>
                                </section>
                                <section className="box b">
                                    <img style={{ height: "1.5rem" }} src={comment} alt="Image representing a comment" />
                                    <b style={{paddingLeft: "0.5rem"}}>{comment_count}</b>
                                </section>
                            </section>
                        </section>

                    </Link>

                </Card.Body>
            </Card>

            <Routes>
                <Route path="articles/:article_id" element={<Article />} />
            </Routes>
        </>
    );
}

export default ArticleCard;
