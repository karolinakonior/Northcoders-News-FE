import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Articles from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import Article from './components/Article';
import SignIn from './components/SignIn';
import Homepage from './components/Homepage';
import Error from './components/Error';
import PostArticle from './components/PostArticle';
import { useEffect, useState } from "react";
import { getTopics, getUsers } from './api/api';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response.data.topics)
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.")
      })

    getUsers()
      .then((response) => {
        setUsers(response.data.users)
      })
      .catch((err) => {
        setError("Something went wrong, please try again.")
      })
  }, [])

  return (
    <Container >
      <Header />
      <Row style={{ marginTop: "1rem" }}>
        <Col xs="1">
          <NavBar topics={topics} error={error} />
        </Col>
        <Col>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/error" element={<Error />} />
            <Route exact path="/topicerror" element={<Error />} />
            <Route exact path="/home" element={<Homepage />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/postarticle" element={<PostArticle topics={topics} />} />
            <Route exact path="/articles/all/*" element={<Articles users={users} />} />
            <Route path="/articles/:topic/*" element={<Articles users={users}/>} />
            <Route path="/articles/:topic/article/:article_id" element={<Article users={users}/>} />
            <Route path="/*" element={<b style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>Path not found...</b>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  )
}

export default App
