import React, { useEffect, useState } from 'react';
import { getAllRecalls } from '../services/recallService';
import RecallItem from './RecallItem';
import "../css/RecallList.css";

const RecallList = ({ recalls }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 recall records initially

  // Reset visibleCount whenever recalls change
  useEffect(() => {
    setVisibleCount(5);
  }, [recalls]);

  return (
    <div className="recall-list-container">
      {recalls.length > 0 && (
        <p className="record-count-info">
          Showing {Math.min(visibleCount, recalls.length)} of {recalls.length} recalls
        </p>
      )}

      {recalls.length === 0 ? (
        <p>No recalls found.</p>
      ) : (
        recalls.slice(0, visibleCount).map((recall, index) => (
          <RecallItem key={index} recall={recall} serial={index + 1} />
        ))
      )}

      {recalls.length > 0 && (
        <p className="record-count-info">
          Showing {Math.min(visibleCount, recalls.length)} of {recalls.length} recalls
        </p>
      )}
      
      {visibleCount < recalls.length && (
        <button className="load-more-button" onClick={() => setVisibleCount(visibleCount + 5)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default RecallList;