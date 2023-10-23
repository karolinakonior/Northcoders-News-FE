import { useEffect, useState } from "react";
import { getComments } from '../api/api';
import Card from 'react-bootstrap/Card';
import ReactTimeAgo from 'react-time-ago'
import vote from '../images/vote-icon.png'
import Spinner from 'react-bootstrap/Spinner';

const CommentsList = ({ article_id }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id)
            .then((response) => {
                setIsLoading(false)
                setComments(response.data.comments)
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
            <h3 style={{ padding: '0.5rem', margin: '1rem', 'font-size': '2rem' }}>Comments:</h3>
            {comments.map((comment) => {
                return (
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <div className="container">
                                <div className="wrapper">
                                    <div class="box a">
                                        <Card.Title>{comment.author}</Card.Title>
                                    </div>
                                    <div class="box b">
                                        <Card.Subtitle className="mb-2 text-muted"><ReactTimeAgo date={comment.created_at} locale="en-US" /></Card.Subtitle>
                                    </div>
                                </div>
                            </div>
                            <Card.Text>
                                {comment.body}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">
                                <img id="comment-icon" src={vote} alt="Image representing votes count" />{comment.votes}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                )
            })}
        </>
    );
}

export default CommentsList;