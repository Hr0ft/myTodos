import React, { Component } from 'react';
import classNames from 'classnames';

class Task extends Component {
  constructor(props) {
    super(props);
    const { onToggleDone, onToggleEdit, id, description } = this.props;
    this.state = {
      editLabel: description,
    };

    this.togleDone = () => {
      onToggleDone(id);
    };

    this.toggleEdit = () => {
      onToggleEdit(id);
    };

    this.onEditLabelChange = this.onEditLabelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // onChange >>>>>> вводим данные в input
  onEditLabelChange(e) {
    this.setState({
      editLabel: e.target.value,
    });
  }

  // onSubmit >>>>>>> применяем изменение в форме
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.editLabel);
    this.props.chngeDescription(this.props.id, this.state.editLabel);
  }

  render() {
    const { done, show, editing, description, timeAfterCreate, onDeleted, fullTime, id, onPlay, onPause, play } =
      this.props;

    let display = '';

    if (editing) {
      display = { display: 'block' };
    }

    console.log(play);
    return (
      <li className={classNames('', { completed: done, hidden: !show, editing: editing })}>
        <div className={classNames('view')}>
          <input className="toggle" type="checkbox" onChange={this.togleDone}></input>
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button
                className="icon icon-play"
                disabled={play}
                onClick={() => {
                  onPlay(id);
                }}
              ></button>
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
          <button className="icon icon-edit" onClick={this.toggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              style={display}
              className="edit"
              defaultValue={this.state.editLabel}
              onChange={this.onEditLabelChange}
            />
          </form>
        ) : null}
      </li>
    );
  }
}

export default Task;

Task.defaultProps = {
  description: 'New Task',
};
