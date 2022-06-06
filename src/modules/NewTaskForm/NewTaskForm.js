import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.PropTypes = {
      onItemAdded: PropTypes.func,
    };

    this.state = {
      label: '',
    };
  }

  onLabelChange(e) {
    this.setState({
      label: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
  }

  render() {
    return (
      <div className="header">
        <h1>todos</h1>
        <form className="new-todo header__wrapper" onSubmit={this.onSubmit.bind(this)}>
          <input
            className="new-todo"
            onChange={this.onLabelChange.bind(this)}
            placeholder="What needs tobe done"
            value={this.state.label}
          ></input>
        </form>
      </div>
    );
  }
}

export default NewTaskForm;
