import React from 'react';

import TaskFilter from '../TaskFilter/TaskFilter';

const Footer = ({ toDo, filterList, toggleFilter, clearTaskList }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TaskFilter toggleFilter={toggleFilter} filterList={filterList} />
      <button className="clear-completed" onClick={clearTaskList}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
