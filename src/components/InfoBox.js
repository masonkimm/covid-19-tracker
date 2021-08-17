import React from 'react';

function InfoBox({ title, cases }) {
  return (
    <div className="infoBox">
      <h3>{title}</h3>

      <h2>{cases}</h2>
    </div>
  );
}

export default InfoBox;
