import { getUser } from "../api/api";
import { UsernameContext } from "../context/username-context";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { username, setUsername } = useContext(UsernameContext)
  const [usernameInput, setUsernameInput] = useState("")
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser(usernameInput)
      .then((response) => {
        setUsername(response.data.user.username)
        setErr(null)
      })
      .then(() => {
        nav(`/`);
      })
      .catch((err) => {
        setErr('Username does not exist, please try again.');
      })
  };

  const handleChange = (event) => {
    setUsernameInput(event.target.value)
  }

  return (
    <>
      {!username ? <Form id="article" onSubmit={handleSubmit} style={{ paddingLeft: "12rem"}}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" style={{ width: '20rem' }}>
            <Form.Label style={{ paddingTop: '2rem', fontSize: "2rem" }}>
              <Card.Title style={{ paddingTop: '2rem', fontSize: "2rem" }}>Enter your username</Card.Title>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="tickle122"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button variant="dark" type="submit">Sign In</Button>
        <section style={{ paddingTop: '1rem', fontSize: "1.5rem" }}>
          {err ? <Card.Title>{err}</Card.Title> : null}
        </section>
      </Form> : <Card.Title style={{ paddingTop: '2rem', fontSize: "2rem" }}>Already signed in!</Card.Title>}
    </>
  );
}

export default SignIn;