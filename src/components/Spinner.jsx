import React from 'react';
import '../css/Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" />
        <p>Loading recalls...</p>
    </div>
  );
};

export default Spinner;
