import Card from 'react-bootstrap/Card';
import comment from '../images/comment-icon.png'
import vote from '../images/vote-icon.png'
import user from '../images/user-icon.png'
import clock from '../images/clock-icon.png'
import { Link } from 'react-router-dom';
import Article from './Article';
import { Routes, Route } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'

const ArticleCard = ({ article_id, comment_count, title, author, created_at, votes, article_img_url }) => {

    return (
        <>

            <Card id="article-card" style={{ width: '70%' }}>

                <Card.Body>
                    <Link to={`articles/${article_id}`} style={{ padding: '0.1rem', color: 'black', 'text-decoration': 'none' }}>
                        <div class="container">
                            <div class="wrapper">
                                <div class="box a">
                                    <Card.Subtitle className="mb-2 text-muted" style={{ padding: '0.5rem' }}>
                                        <img id="comment-icon" src={user} alt="Image representing a user" />{" "}{author} {" "}
                                    </Card.Subtitle>
                                </div>
                                <div class="box b">
                                    <img id="comment-icon" src={clock} alt="Image representing a clock" />{" "}
                                    <ReactTimeAgo date={created_at} locale="en-US" />
                                </div>
                            </div>
                        </div>


                        <Card.Img src={article_img_url} alt="Image corresponding to the article topic" ></Card.Img>
                        <Card.Title style={{ padding: '0.8rem' }}>{title}</Card.Title>
                        <div class="container">
                            <div class="wrapper">
                                <div class="box a">
                                    <Card.Subtitle style={{ padding: '0.5rem' }} className="mb-2 text-muted">
                                        <img id="comment-icon" src={vote} alt="Image representing votes count" />{votes}
                                    </Card.Subtitle>

                                </div>
                                <div class="box b">
                                    <img id="comment-icon" src={comment} alt="Image representing a comment" />{comment_count}
                                </div>
                            </div>
                        </div>

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
