import React from 'react';
import { useSelector } from 'react-redux';

const TechOptions = () => {
  const techList = useSelector((state) => state.techList);
  const { techs } = techList;

  // sorts in alphabetical order for last name
  techs.sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });

  return techs.map((tech) => (
    <option key={tech._id} value={tech._id}>
      {tech.lastName}, {tech.firstName}
    </option>
  ));
};

export default TechOptions;
