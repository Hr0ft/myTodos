/// не получается настроить работу onPlay onPaused для конкретной задачи, сложности с  `this.`

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskFormHooks from '../NewTaskForm-hooks/NewTaskForm-hooks';
import TaskListHooks from '../TaskListHooks/TaskListHooks';
import Footer from '../Footer/Footer';
import { textConstants, MYTODOSTATE } from '../constants';
import { createTodoItem } from '../SupportFunction/createTodoItem';
import { toggleProperty } from '../SupportFunction/toggleProperty';

import '../../index.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      filterList: [
        { activFilter: true, name: 'all' },
        { activFilter: true, name: 'active' },
        { activFilter: true, name: 'completed' },
      ],
    };

    //>>>>> LS
    this.setLocalState = this.setLocalState.bind(this);
    this.getDataLocalStorage = this.getDataLocalStorage.bind(this);
    this.updateStateTodoList = this.updateStateTodoList.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);

    //>>>>>   Countdown
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);

    //>>>>>   TaskList
    this.onToggleEdit = (id) => {
      this.setState(({ todoList }) => {
        return { todoList: toggleProperty(todoList, id, 'editing') };
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoList }) => {
        return { todoList: toggleProperty(todoList, id, 'done') };
      });
    };

    this.chngeDescription = (id, text) => {
      this.setState(({ todoList }) => {
        return { todoList: toggleProperty(todoList, id, 'editing', 'description', text) };
      });
    };

    //>>>>>    Footer
    this.toggleFilter = (name) => {
      this.setState(({ todoList, filterList }) => {
        const idx = filterList.findIndex((el) => el.name === name);
        const oldItem = filterList[idx];

        const newItem = { ...oldItem, activFilter: (oldItem.activFilter = true) };

        let before = [...filterList.slice(0, idx)];
        let after = [...filterList.slice(idx + 1)];

        before.map((el) => (el.activFilter = false));
        after.map((el) => (el.activFilter = false));

        const newArray = [...before, newItem, ...after];

        let newTodoList = [];

        if (name === textConstants.ALL) {
          newTodoList = todoList.map((el) => {
            el.show = true;
            return el;
          });
        } else if (name === textConstants.ACTIVE) {
          newTodoList = todoList.map((el) => {
            el.show = true;
            if (el.done) {
              el.show = false;
            }
            return el;
          });
        } else if (name === textConstants.COOMPLETED) {
          newTodoList = todoList.map((el) => {
            el.show = true;
            if (!el.done) {
              el.show = false;
            }
            return el;
          });
        }

        return { filterList: newArray, todoList: newTodoList };
      });
    };
  }

  //>>>>>   LocalStorage update
  setLocalState() {
    let localProp = localStorage.getItem(MYTODOSTATE);
    if (!localProp) {
      localStorage.setItem(MYTODOSTATE, JSON.stringify([]));
    }
  }
  getDataLocalStorage() {
    const state = localStorage.getItem(MYTODOSTATE);
    return JSON.parse(state);
  }
  updateLocalStorage() {
    localStorage.setItem(MYTODOSTATE, JSON.stringify(this.state.todoList));
  }
  updateStateTodoList() {
    let localTodoList = this.getDataLocalStorage();

    this.setState(({ todoList }) => {
      let newArr = todoList.slice(0);
      newArr = newArr.concat(localTodoList);
      return { todoList: newArr };
    });
  }

  //>>>>> todoList update
  addItem(text, time) {
    const newItem = createTodoItem(text, time, uuidv4);

    if (text !== '') {
      this.setState(({ todoList }) => {
        const newArr = [...todoList, newItem];
        return {
          todoList: newArr,
        };
      });
    }
  }

  deleteItem(id) {
    clearInterval(this.inteerval);
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const newArray = [...todoList.slice(0, idx), ...todoList.slice(idx + 1)];
      return { todoList: newArray };
    });
  }
  clearTaskList() {
    this.setState(({ todoList }) => {
      const newArr = todoList.filter((el) => {
        return el.done !== true;
      });
      return { todoList: newArr };
    });
  }

  //>>>>> countdown control
  updateTime(id) {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const oldItem = todoList[idx];
      if (oldItem.fullTime > 0) {
        const newItem = { ...oldItem, play: true, fullTime: oldItem.fullTime - 1 };
        return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
      } else {
        clearInterval(this.inteerval);
      }
    });
  }

  onPlay(id) {
    const idx = this.state.todoList.findIndex((el) => el.id === id);
    const oldItem = this.state.todoList[idx];
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const oldItem = todoList[idx];
      const newItem = { ...oldItem, play: true };

      return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
    });

    if (!oldItem.play) {
      this.inteerval = setInterval(() => {
        this.updateTime(id);
      }, 1000);
    }
  }

  onPause(id) {
    clearInterval(this.inteerval);
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const oldItem = todoList[idx];
      const newItem = { ...oldItem, play: false };
      return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
    });
  }

  componentDidMount() {
    this.setLocalState();
    this.updateStateTodoList();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.todoList) !== this.state.todoList) {
      this.updateLocalStorage();
    }
  }

  render() {
    const { todoList, filterList } = this.state;

    const doneCount = todoList.filter((el) => el.done).length;
    const todoCount = todoList.length - doneCount;

    return (
      <section className="todoapp">
        <NewTaskFormHooks onItemAdded={this.addItem.bind(this)} />
        <section className="main">
          <TaskListHooks
            todos={todoList}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            chngeDescription={this.chngeDescription}
            onDeleted={this.deleteItem.bind(this)}
            onPlay={this.onPlay}
            onPause={this.onPause}
          />

          <Footer
            toDo={todoCount}
            filterList={filterList}
            clearTaskList={this.clearTaskList.bind(this)}
            toggleFilter={this.toggleFilter}
          />
        </section>
      </section>
    );
  }
}

export default App;
