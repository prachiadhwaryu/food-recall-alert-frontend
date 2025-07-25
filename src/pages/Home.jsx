import React, {useEffect} from 'react';
import { useState } from "react";
import { US_STATES } from '../constants/usStates';
import RecallList from '../components/RecallList';
import Spinner from '../components/Spinner';
import axios from 'axios';
import '../css/RecallList.css';
import '../css/App.css';

function Home() {
  const [recalls, setRecalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect (() => {
    const fetchRecalls = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (selectedState) queryParams.append("state", selectedState);
        if (searchTerm) queryParams.append("product", searchTerm);

        const response = await axios.get(
          `http://localhost:8081/api/external-recalls?${queryParams.toString()}`
        );
        setRecalls(response.data);

      } catch (error) {
        console.error('Error fetching recall data:', error);
      } finally {
      setLoading(false);
    }
    };

    fetchRecalls();
  }, [selectedState, searchTerm]);

  return (
    
    <div className="app-container">
      <header>
        <h1>Food Recall Alerts</h1>
      </header>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="state">Filter by State:</label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">All</option>
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="search">Search by Product Name:</label>
          <input
            type="text"
            id="search"
            placeholder="Enter product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <main className="main-content">
        {loading ? <Spinner /> : <RecallList recalls={recalls} />}
      </main>

      <footer>
        © 2025 Food Recall Tracker | Data from FDA.gov
      </footer>
    </div>

  );
}

export default Home;
