import Card from 'react-bootstrap/Card';

const ArticleCard = ({ comment_count, title, author, created_at, votes, article_img_url }) => {

    return (
        <>
            <Card id="article-card"> 
                <Card.Body>
                    {/* <img src={article_img_url} id='article-card-image'></img> */}
                    <Card.Subtitle className="mb-2 text-muted">{author} {created_at}</Card.Subtitle>
                    <Card.Img src={article_img_url} ></Card.Img>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Votes: {votes}, Comments: {comment_count}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    );
}

export default ArticleCard;
