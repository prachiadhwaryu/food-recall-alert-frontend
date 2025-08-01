import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import ViewSubscribers from './pages/Admin/ViewSubscribers';
import axios from 'axios';
import './css/RecallList.css';
import './css/App.css';

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/subscribe">Subscribe</Link>
        <Link to="/admin/subscribers"> Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/admin/subscribers" element={<ViewSubscribers />} />
      </Routes>
    </Router>
  );
}

export default App;
