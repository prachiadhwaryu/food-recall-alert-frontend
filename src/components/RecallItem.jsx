import React from 'react';
import "../css/RecallList.css";

const RecallItem = ({ recall, serial }) => {
    const formatDate = (rawDate) => {
    if (!rawDate || rawDate.length !== 8) return rawDate;
    const year = rawDate.substring(0, 4);
    const month = rawDate.substring(4, 6);
    const day = rawDate.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="recall-card">
      
      <h3><span className="recall-serial">{serial}.  </span>{recall.productDescription || 'Unnamed Product'}</h3>
      <p><strong>Reason:</strong> {recall.reasonForRecall}</p>
      <p><strong>Company:</strong> {recall.recallingFirm}</p>
      <p><strong>State:</strong> {recall.distributionPattern}</p>
      <p><strong>Date:</strong> {formatDate(recall.recallInitiationDate)}</p>
    </div>
  );
};

export default RecallItem;
