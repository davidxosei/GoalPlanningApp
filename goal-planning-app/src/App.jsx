import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
      </Routes>
    </Router>
  )
}

export default App
