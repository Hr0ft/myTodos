import React, { useState } from 'react';
import classNames from 'classnames';

const TaskHooks = ({
  id,
  description,
  done,
  show,
  editing,
  fullTime,
  play,
  onToggleDone,
  onToggleEdit,
  timeAfterCreate,
  chngeDescription,
  onDeleted,
  onPlay,
  onPause,
}) => {
  const [editLabel, setEditLabel] = useState(description);

  let display = '';
  if (editing) {
    display = { display: 'block' };
  }
  return (
    <li className={classNames('', { completed: done, hidden: !show, editing: editing })}>
      <div className={classNames('view')}>
        <input className="toggle" type="checkbox" onChange={() => onToggleDone(id)} checked={done}></input>
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <button className="icon icon-play" disabled={play} onClick={onPlay}></button>
            <button
              className="icon icon-pause"
              onClick={() => {
                onPause(id);
              }}
            ></button>
            {` ${Math.floor(fullTime / 60)}:${fullTime % 60 < 10 ? `0${fullTime % 60}` : fullTime % 60}`}
          </span>
          <span className="description"> created {timeAfterCreate} ago</span>
        </label>
        <button className="icon icon-edit" onClick={() => onToggleEdit(id)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            chngeDescription(id, editLabel);
          }}
        >
          <input
            type="text"
            style={display}
            className="edit"
            defaultValue={editLabel}
            onChange={(e) => {
              setEditLabel(e.target.value);
            }}
          />
        </form>
      ) : null}
    </li>
  );
};
export default TaskHooks;
