import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import TaskHooks from '../task-hooks';

const TaskList = ({
  todos,
  onDeleted,
  onToggleDone,
  onToggleEdit,
  toggleEditigFalse,
  chngeDescription,
  onPlay,
  onPause,
}) => {
  const list = todos.map((item) => {
    const { id, ...itemProps } = item;
    const timeAfterCreate = formatDistanceToNow(Date.now(item.createItem));

    return (
      <TaskHooks
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(item.id)}
        timeAfterCreate={timeAfterCreate}
        id={id}
        onToggleDone={onToggleDone}
        onToggleEdit={onToggleEdit}
        toggleEditigFalse={toggleEditigFalse}
        chngeDescription={chngeDescription}
        onPlay={() => onPlay(item.id)}
        onPause={onPause}
      />
    );
  });

  //проверяем на наличие задачь в state и отрисовываем задачи/сообщение

  const data =
    todos.length > 0 && todos !== null ? (
      list
    ) : (
      <li
        className="view"
        style={{ height: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
      >
        <div>Task is not create</div>
      </li>
    );
  return <ul className="todo-list">{data}</ul>;
};

export default TaskList;
TaskList.defaultProps = {
  onDeleted: () => {},
};
