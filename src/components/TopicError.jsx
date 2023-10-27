import Card from 'react-bootstrap/Card';

const TopicError = () => {
    return (
        <>
            <div style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>
                <Card.Title>Topic was not found.</Card.Title>
                <Card.Subtitle>Please try different topic.</Card.Subtitle>
            </div>
        </>);
}

export default TopicError;