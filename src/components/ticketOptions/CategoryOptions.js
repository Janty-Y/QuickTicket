import React from 'react';

const CategoryOptions = () => {
  const categories = [
    'N/A',
    'Account',
    'Email',
    'Hardware',
    'Network',
    'Software',
    'Other',
  ];

  return categories.map((c, i) => (
    <option key={i} value={c}>
      {c}
    </option>
  ));
};

export default CategoryOptions;
