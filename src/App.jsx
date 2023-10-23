import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Articles from './components/Articles'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="grid">
        <Header />
        <NavBar />
        <div id="article">
          <Articles />
        </div>
        <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/home" element={<Articles />} />
      </Routes>
      </div>
    </>
  )
}

export default App
