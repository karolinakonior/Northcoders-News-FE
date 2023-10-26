import { Link } from 'react-router-dom';
import { useEffect, useState } from "react"
import { getTopics } from "../api/api"
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';


const NavBar = () => {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getTopics()
            .then((response) => {
                setTopics(response.data.topics)
            })
            .catch((error) => {
                setError("Something went wrong. Please try again later.")
            })
    }, [])

    return (
        <>
            <section id="sidebar">
                <Button style={{ borderRadius: "1rem", fontSize: "1.5rem", height: "3rem" }} variant="dark" onClick={handleShow} id="menu-button">
                    ≡
                </Button>
                <Offcanvas style={{ width: "15rem", borderRadius: "1rem", marginTop: "5rem" }} show={show} onHide={handleClose}>
                    <Offcanvas.Body >

                        {error ? <Offcanvas.Header >
                            <Offcanvas.Title>{error}</Offcanvas.Title>
                        </Offcanvas.Header> : null}

                        <Card>
                            <Link style={{color: "black", textDecoration: "none"}} to="/">
                                <Card.Body>
                                    <Card.Title style={{ padding: '0.2rem' }}> HOME
                                    </Card.Title>
                                </Card.Body>
                            </Link>
                        </Card>

                        {topics.map((topic, index) => {
                            return (
                                <section key={index}>
                                <Link to={`/articles/${topic.slug}`} style={{color: "black", textDecoration: "none"}}>
                                    <Card >
                                        <Card.Body>
                                            <Card.Title key={index} style={{ padding: '0.2rem' }}>
                                                {topic.slug.toUpperCase()}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                                </section>
                            )
                        })}

                        <Card>
                            <Link to="/signin" style={{color: "black", textDecoration: "none"}}>
                                <Card.Body>
                                    <Card.Title style={{ padding: '0.2rem' }}> SIGN IN
                                    </Card.Title>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Offcanvas.Body>
                </Offcanvas>
            </section>
        </>
    );
}

export default NavBar;