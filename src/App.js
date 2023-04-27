import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import Home from './components/Pages/Home'
import Company from './components/Pages/Company'
import Contato from './components/Pages/Contato'
import Newproject from './components/Pages/Newproject'
import Container from './components/layout.js/Container'
import Navbar from './components/layout.js/Navbar'
import Footer from './components/layout.js/Footer'
import Projects from './components/Pages/Projects'
import Project from './components/Pages/Project'

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass='min_height'>
      <Routes>
        <Route  path='/projects' element={<Projects/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route  path='/Company' element={<Company/>}/>
        <Route  path='/Contato' element={<Contato/>}/>
        <Route  path='/Newproject' element={<Newproject/>}/>
        <Route  path='/Project/:id' element={<Project/>}/>     
      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
