import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import ViewSubscribers from './pages/Admin/ViewSubscribers';
import axios from 'axios';
import './css/RecallList.css';
import './css/App.css';
import { currentUser } from './constants/userContext';
import { switchRole } from './constants/userContext'; 

function App() {
  return (
    <><Router>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/subscribe">Subscribe</Link>
        {currentUser.role === 'admin' && (
          <Link to="/admin/subscribers"> Admin</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/admin/subscribers" element={currentUser.role === 'admin' ? (
          <ViewSubscribers />
        ) : (<div>You do not have permission to view this page.</div>)} />
      </Routes>
    </Router>
    <button onClick={() => switchRole(currentUser.role === 'admin' ? 'user' : 'admin')}>
        Switch to {currentUser.role === 'admin' ? 'User' : 'Admin'}
    </button>
    </>
  );
}

export default App;
