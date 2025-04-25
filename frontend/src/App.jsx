import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import Authorize from './components/Authorize';
import Create from './views/Create';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import './App.css'
import DisplayRoadmap from './views/DisplayRoadmap';
import AlreadyAuthenticated from './components/AlreadyAuthenticated';

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/login" element = {<AlreadyAuthenticated><Login /></AlreadyAuthenticated>} />
        <Route path = "display-roadmap" element = {<Authorize><DisplayRoadmap /></Authorize>} />
        <Route path = "/register" element = {<AlreadyAuthenticated><Register /></AlreadyAuthenticated>} />
        <Route path = "/" element = {<Authorize ><Home /></Authorize>} />
        <Route path = "/create" element = {<Authorize><Create /></Authorize>} />
        <Route path = "*" element = {<Navigate to = "/" />} />
      </Routes>
    </Router>
  )
}

export default App
