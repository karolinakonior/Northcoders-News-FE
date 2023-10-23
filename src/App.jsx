import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Articles from './components/Articles'

function App() {

  return (
    <>
      <div className="grid">
        <Header />
        <NavBar />
        <div id="article">
          <Articles />
        </div>
      </div>
    </>
  )
}

export default App
