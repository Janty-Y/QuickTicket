import React from 'react';

const BuildingOptions = () => {
  const buildings = [
    'N/A',
    'Autumn Ballroom',
    'Cafeteria',
    'Spring Tower',
    'Summer Hall',
    "President's Chamber",
    'Winter Rise',
  ];

  return buildings.map((b, i) => (
    <option key={i} value={b}>
      {b}
    </option>
  ));
};

export default BuildingOptions;
