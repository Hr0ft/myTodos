import React from 'react';

const Filter = ({ toggleFilter, name, activeFilter }) => {
  let className = '';

  if (activeFilter) {
    className += ' selected';
  }

  return (
    <li className="filter">
      <button onClick={toggleFilter} className={className}>
        {name}
      </button>
    </li>
  );
};

export default Filter;
