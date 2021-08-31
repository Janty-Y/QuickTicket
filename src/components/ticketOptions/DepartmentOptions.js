import React from 'react';

const DepartmentOptions = () => {
  const departments = [
    'N/A',
    'Accounting',
    'Human Resources',
    'Information Technology',
    "President's Office",
    'Sales',
    'Warehouse',
    'Other',
  ];

  return departments.map((d, i) => (
    <option key={i} value={d}>
      {d}
    </option>
  ));
};

export default DepartmentOptions;
