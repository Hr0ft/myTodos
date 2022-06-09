import React, { Component } from 'react';
import classNames from 'classnames';

import '../../index.css';

class Task extends Component {
  constructor(props) {
    super(props);
    const { onToggleDone, onToggleEdit, id } = this.props;
    this.state = {
      editLabel: '',
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
    this.props.chngeDescription(this.props.id, this.state.editLabel);
  }

  render() {
    const { done, show, editing, description, timeAfterCreate, onDeleted } = this.props;

    let display = '';

    if (editing) {
      display = { display: 'block' };
    }
    return (
      <li className={classNames('', { completed: done, hidden: !show })}>
        <div className={classNames('view', { edit: editing })} onSubmit={this.onSubmit}>
          <input className="toggle" type="checkbox" onChange={this.togleDone}></input>
          <label>
            <span className="description">{description}</span>
            <span className="created">created {timeAfterCreate} ago</span>
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
              defaultValue={description}
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
