import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Task from '../Task/Task';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskLabel: '',
    };
  }

  render() {
    const { todos, onDeleted, onToggleDone, onToggleEdit, toggleEditigFalse, chngeDescription } = this.props;
    const list = todos.map((item) => {
      const { id, ...itemProps } = item;
      const timeAfterCreate = formatDistanceToNow(Date.now(item.createItem));
      return (
        <Task
          key={id}
          {...itemProps}
          onDeleted={() => onDeleted(item.id)}
          timeAfterCreate={timeAfterCreate}
          id={id}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          toggleEditigFalse={toggleEditigFalse}
          chngeDescription={chngeDescription}
        />
      );
    });

    return <ul className="todo-list">{list}</ul>;
  }
}

export default TaskList;
TaskList.defaultProps = {
  onDeleted: () => {},
};
