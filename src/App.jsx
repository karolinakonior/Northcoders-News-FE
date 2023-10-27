import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Articles from './components/Articles'
import { Routes, Route } from 'react-router-dom';
import Article from './components/Article';
import SignIn from './components/SignIn';
import Homepage from './components/Homepage';
import Error from './components/Error';
import PostArticle from './components/PostArticle';
import { useEffect, useState } from "react"
import { getTopics } from './api/api';

function App() {
  const [topics, setTopics] = useState([])
   const [error, setError] = useState("")

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
      <div className="grid">
        <Header />
        <NavBar topics={topics} error={error}/>
      
        <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/error" element={<Error />} />
        <Route exact path="/topicerror" element={<Error />} />
        <Route exact path="/home" element={<Homepage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/postarticle" element={<PostArticle topics={topics}/>} />
        <Route exact path="/articles/all/*" element={<Articles />} />
        <Route path="/articles/:topic/*" element={<Articles />} />
        <Route path="/articles/:topic/article/:article_id" element={<Article />} />
        <Route path="/*" element={<b style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>Path not found...</b>} />
      </Routes>
      </div>
    </>
  )
}

export default App
