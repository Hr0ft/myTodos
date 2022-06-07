import React, { Component } from 'react';
import '../../index.css';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editLabel: '',
    };

    this.togleDone = () => {
      this.props.onToggleDone(this.props.id);
    };

    this.toggleEdit = () => {
      this.props.onToggleEdit(this.props.id);
    };

    // onChange >>>>>> вводим данные в input
    this.onEditLabelChange = this.onEditLabelChange.bind(this);
    // onSubmit >>>>>>> применяем изменение в форме
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
    const { done, show, editing } = this.props;

    let classNameEdit = 'view';

    let className = '';
    if (done) {
      className += ' completed';
    }
    if (!show) {
      className += ' hidden';
    }

    let display = '';

    if (editing) {
      display = { display: 'block' };
      classNameEdit += ' edit';
    }
    return (
      <li className={className}>
        <div className={classNameEdit} onSubmit={this.onSubmit}>
          <input className="toggle" type="checkbox" onChange={this.togleDone}></input>
          <label>
            <span className="description">{this.props.description}</span>
            <span className="created">created {this.props.timeAfterCreate} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.toggleEdit}></button>
          <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
        {editing ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              style={display}
              className="edit"
              defaultValue={this.props.description}
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
