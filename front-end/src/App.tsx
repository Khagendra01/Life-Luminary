
import './App.css'
import DailyNote from './components/DailyNote'
import Footer from './components/Footer'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './pages/About'

function App() {


  return (
    <>
       <Navbar />
       <Home />
       <DailyNote />
       <About />
       <Footer />
    </>
  )
}

export default App
