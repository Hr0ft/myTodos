import React, { Component } from 'react';
import '../../index.css';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskLabel: this.props.description,
    };

    this.togle = () => {
      this.props.onToggleDone(this.props.id);
    };
    this.onEditng = (evt) => {
      evt.preventDefault();
      this.props.onEdit(this.props.id);
    };
    this.onSubmit = (e) => {
      console.log(e);
      e.preventDefault();
      console.log(e.target.value);
      this.setState({
        taskLabel: e.target.value,
      });
    };
    this.onEditLabelChange = (e) => {
      this.editChage(e);
    };
  }

  editChage(e) {
    this.setState({ taskLabel: e });
  }

  render() {
    console.log(this.state.taskLabel);
    const { onDeleted, done, show, editing, timeAfterCreate } = this.props;

    let className = '';
    let classNameEdit = '';

    if (done) {
      className += ' completed';
    }
    if (!show) {
      className += ' hidden';
    }
    if (!editing) {
      classNameEdit += ' edit';
    }
    return (
      <li className={className}>
        <form className="view" onSubmit={this.onSubmit}>
          <input className="toggle" type="checkbox" onChange={this.togle}></input>
          <label>
            <span className="description">{this.state.taskLabel}</span>
            <span className="created">created {timeAfterCreate} ago</span>
            <input
              type="text"
              className={classNameEdit}
              defaultValue={this.state.taskLabel}
              onChange={(e) => this.onEditLabelChange(e.target.value)}
            ></input>
          </label>
          <button className="icon icon-edit" onClick={this.onEditng}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </form>
      </li>
    );
  }
}

export default Task;

Task.defaultProps = {
  description: 'New Task',
};
