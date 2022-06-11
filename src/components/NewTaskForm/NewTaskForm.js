import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    this.PropTypes = {
      onItemAdded: PropTypes.func,
    };

    this.state = {
      text: '',
      minute: 0,
      second: 0,
    };
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
  }

  onLabelChange(e) {
    let { name, value } = e.target;
    if (name === 'second') {
      if (value > 58) {
        value = 59;
      }
      console.log(value);
    }
    this.setState({
      [name]: value,
    });
  }

  onHandleSubmit() {
    if (!isNaN(this.state.minute) && !isNaN(this.state.second)) {
      let fullTime = Number(this.state.minute) * 60 + Number(this.state.second);
      this.props.onItemAdded(this.state.text, fullTime);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') this.onHandleSubmit();
            }}
            type="text"
            name="text"
            className="new-todo"
            onChange={this.onLabelChange}
            placeholder="What needs tobe done"
            value={this.state.text}
          ></input>
          <input
            type="text"
            className="new-todo-form__timer"
            name="minute"
            placeholder="Min"
            maxLength={4}
            onChange={this.onLabelChange}
          ></input>
          <input
            type="text"
            className="new-todo-form__timer"
            name="second"
            placeholder="Sec"
            maxLength={2}
            onChange={this.onLabelChange}
          ></input>
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
