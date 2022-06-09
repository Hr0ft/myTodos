import React from 'react';

import Filter from '../Filter';

const TaskFilter = ({ toggleFilter, filterList }) => {
  const filterItem = filterList.map((item) => {
    const { name } = item;
    return <Filter key={name} toggleFilter={() => toggleFilter(name)} {...item} filterList={filterList} />;
  });

  return <ul className="filters">{filterItem}</ul>;
};

export default TaskFilter;
