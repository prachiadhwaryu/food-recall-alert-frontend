import React, {useEffect} from 'react';
import { useState } from "react";
import { US_STATES } from '../src/constants/usStates';
import RecallList from './components/RecallList';
import Spinner from './components/Spinner';
import axios from 'axios';
import './css/RecallList.css';

function App() {
  const [recalls, setRecalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("");

  useEffect (() => {
    const fetchRecalls = async () => {
       try {
        let url = 'http://localhost:8081/api/external-recalls';
        if (selectedState) {
          url += `?state=${selectedState}`;
        }
        setLoading(true);
        const res = await axios.get(url);
        setRecalls(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recall data:', error);
      }
    };

    fetchRecalls();
  }, [selectedState]);

return (
    <div style={{ padding: '1rem' }}>
      <h1>Food Recall Alerts</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="state">Filter by State: </label>
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

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <main style={{ flex: '1', padding: '2rem' }}>
          {loading ? <Spinner /> : <RecallList recalls={recalls} />}
        </main>
        <footer >
          © 2025 Food Recall Tracker | Data from FDA.gov
        </footer>
      </div>
    </div>
  );
}

export default App;
