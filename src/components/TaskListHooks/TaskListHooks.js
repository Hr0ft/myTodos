import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import TaskHooks from '../Task-hooks';

const TaskListHooks = ({ todos, onPlay, onDeleted, onToggleDone, onToggleEdit, chngeDescription, onPause }) => {
  const list = todos.map((item) => {
    const { id, ...itemProps } = item;
    const timeAfterCreate = formatDistanceToNow(Date.now(item.createItem));

    return (
      <TaskHooks
        key={id}
        id={id}
        {...itemProps}
        onToggleDone={onToggleDone}
        onToggleEdit={onToggleEdit}
        timeAfterCreate={timeAfterCreate}
        chngeDescription={chngeDescription}
        onDeleted={() => onDeleted(item.id)}
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

export default TaskListHooks;

TaskListHooks.defaultProps = {
  onDeleted: () => {},
};
