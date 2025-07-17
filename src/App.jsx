import React, {useEffect} from 'react';
import { useState } from "react";
import { US_STATES } from '../src/constants/usStates';
import RecallList from './components/RecallList';
import axios from 'axios';
import './css/RecallList.css';

function App() {
  const [recalls, setRecalls] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect (() => {
    const fetchRecalls = async () => {
       try {
        let url = 'http://localhost:8081/api/external-recalls';
        if (selectedState) {
          url += `?state=${selectedState}`;
        }
        
        const res = await axios.get(url);
        setRecalls(res.data);
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
          <RecallList recalls={recalls} />
        </main>
        <footer >
          © 2025 Food Recall Tracker | Data from FDA.gov
        </footer>
      </div>
    </div>
  );
}

export default App;

   
/*function RecallList({ recalls }) {
  return (
    <div>
      <h2>Recall List</h2>
      {recalls.length === 0 ? (
        <p>No recalls found for selected state.</p>
      ) : (
        recalls.map((recall, index) => (
          <div key={index} className="recall-card">
            <p><strong>Product:</strong> {recall.productDescription}</p>
            <p><strong>Reason:</strong> {recall.reasonForRecall}</p>
            <p><strong>Firm:</strong> {recall.recallingFirm}</p>
            <p><strong>Date:</strong> {recall.recallInitiationDate}</p>
          </div>
        ))
      )}
    </div>
  );
}*/
