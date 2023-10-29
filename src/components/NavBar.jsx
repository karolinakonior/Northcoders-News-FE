import { Link } from 'react-router-dom';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';


const NavBar = ({ topics, error }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <section id="sidebar">
            <Button className="centered-element" style={{ fontSize: "1.5rem", height: "3rem" }} variant="dark" onClick={handleShow} id="menu-button">
                ≡
            </Button>
            <Offcanvas style={{ width: "15rem", borderRadius: "1rem" }} show={show} onHide={handleClose}>
                <Offcanvas.Body >

                    {error ? <Offcanvas.Header >
                        <Offcanvas.Title>{error}</Offcanvas.Title>
                    </Offcanvas.Header> : null}

                    <Card>
                        <Link style={{ color: "black", textDecoration: "none" }} to="/">
                            <Card.Body>
                                <Card.Title style={{ padding: '0.2rem' }}> HOME
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>

                    <Card>
                        <Link to="/signin" style={{ color: "black", textDecoration: "none" }}>
                            <Card.Body>
                                <Card.Title style={{ padding: '0.2rem' }}> SIGN IN
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>

                    {topics.map((topic, index) => {
                        return (
                            <section key={index}>
                                <Link to={`/articles/${topic.slug}`} style={{ color: "black", textDecoration: "none" }}>
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
                        <Link style={{ color: "black", textDecoration: "none" }} to="/postarticle">
                            <Card.Body>
                                <Card.Title style={{ padding: '0.2rem' }}> POST AN ARTICLE
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </Offcanvas.Body>
            </Offcanvas>
        </section>
    );
}

export default NavBar;