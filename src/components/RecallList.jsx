import React, { useEffect, useState } from 'react';
import { getAllRecalls } from '../services/recallService';
import RecallItem from './RecallItem';
import "../css/RecallList.css";

const RecallList = ({ recalls }) => {
  return (
    <div className="recall-list-container">
      {recalls.length === 0 ? (
        <p>No recalls found.</p>
      ) : (
        recalls.map((recall, index) => (
          <RecallItem key={index} recall={recall} />
        ))
      )}
    </div>
  );
};

export default RecallList;