import React, { useState } from 'react';
// import PropTypes from 'prop-types';

const NewTaskFormHooks = ({ onItemAdded }) => {
  const [text, setText] = useState('');
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (!isNaN(minute) && !isNaN(second)) {
                let fullTime = Number(minute) * 60 + Number(second);
                onItemAdded(text, fullTime);
              }
            }
          }}
          type="text"
          name="text"
          className="new-todo"
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs tobe done"
          value={text}
        ></input>
        <input
          type="text"
          className="new-todo-form__timer"
          name="minute"
          placeholder="Min"
          maxLength={3}
          onChange={(e) => setMinute(e.target.value)}
        ></input>
        <input
          type="text"
          className="new-todo-form__timer"
          name="second"
          placeholder="Sec"
          maxLength={2}
          onChange={(e) => {
            let { value } = e.target;
            if (value > 58) {
              value = 59;
            }
            setSecond(value);
          }}
        ></input>
      </form>
    </header>
  );
};

export default NewTaskFormHooks;
