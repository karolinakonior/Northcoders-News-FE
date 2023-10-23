import Card from 'react-bootstrap/Card';
import comment from '../images/comment-icon.png'
import vote from '../images/vote-icon.png'
import user from '../images/user-icon.png'
import clock from '../images/clock-icon.png'

const ArticleCard = ({ comment_count, title, author, created_at, votes, article_img_url }) => {

    return (
        <>
            <Card id="article-card" style={{ width: '70%' }}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted" style={{ padding: '0.5rem' }}>
                        <img id="comment-icon" src={user} alt="Image representing a user"/>{" "}{author} {" "}
                        <img id="comment-icon" src={clock} alt="Image representing a clock" />{created_at}</Card.Subtitle>
                    <Card.Img src={article_img_url} alt="Image corresponding to the article topic" ></Card.Img>
                    <Card.Title style={{ padding: '0.5rem' }}>{title}</Card.Title>
                    <Card.Subtitle style={{ padding: '0.5rem' }} className="mb-2 text-muted">
                        <img id="comment-icon" src={vote} alt="Image representing votes count" />{votes} {" "}{" "}
                        <img id="comment-icon" src={comment} alt="Image representing a comment" />{comment_count}
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    );
}

export default ArticleCard;
