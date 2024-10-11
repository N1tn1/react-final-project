import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import Home from './components/Home'; 
import ContactUs from './components/ContactUs'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todos">Tasks</Link>
            </li>
            <li>
              <Link to="/contactus">ContactUs</Link>
            </li>
            <li>
              <span style={{ cursor: 'not-allowed', color: 'black'}}>Help</span>
            </li>
            <li>
              <span style={{ cursor: 'not-allowed', color: 'black' }}>SignIn</span>
            </li>
            
          </ul>
        </nav>

        <Routes>
          
          <Route path="/" element={<Home />}/>
          <Route path="/todos" element={<TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />} />
          <Route path="/contactus" element={<ContactUs />}/>
          
        </Routes>
      </div>
    </Router>
  )
}

export default App;