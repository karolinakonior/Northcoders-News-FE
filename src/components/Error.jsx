import Card from 'react-bootstrap/Card';

const Error = () => {
    return (
        <>
            <p style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>
                <Card.Title>Article was not found.</Card.Title>
                <Card.Subtitle>Please try different article id.</Card.Subtitle>
            </p>
        </>);
}

export default Error;