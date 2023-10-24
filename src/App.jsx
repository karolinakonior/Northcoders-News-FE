import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Articles from './components/Articles'
import { Routes, Route } from 'react-router-dom';
import Article from './components/Article';
import SignIn from './components/SignIn';

function App() {

  return (
    <>
      <div className="grid">
        <Header />
        <NavBar />
      
        <Routes>
        <Route exact path="/" element={<Articles />} />
        <Route exact path="/home" element={<Articles />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/*" element={<p>path not found...</p>} />
      </Routes>
      </div>
    </>
  )
}

export default App
