import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { isEqual } from 'lodash.isequal';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import { textConstants, MYTODOSTATE } from '../constants';
// import  from '../constants/constants';
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

    this.MYTODOSTATE = MYTODOSTATE;
    this.textConstants = textConstants;
    //>>>>>>> LS
    this.setLocalState = this.setLocalState.bind(this);
    this.getDataLocalStorage = this.getDataLocalStorage.bind(this);
    this.updateStateTodoList = this.updateStateTodoList.bind(this);

    // >>>>>> old

    this.onToggleDone = (id) => {
      this.setState(({ todoList }) => {
        return { todoList: this.toggleProperty(todoList, id, 'done') };
      });
    };

    this.onToggleEdit = (id) => {
      this.setState(({ todoList }) => {
        return { todoList: this.toggleProperty(todoList, id, 'editing') };
      });
    };

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

        if (name === this.textConstants.ALL) {
          newTodoList = todoList.map((el) => {
            el.show = true;
            return el;
          });
        } else if (name === this.textConstants.ACTIVE) {
          newTodoList = todoList.map((el) => {
            el.show = true;
            if (el.done) {
              el.show = false;
            }
            return el;
          });
        } else if (name === this.textConstants.COOMPLETED) {
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

    this.chngeDescription = this.toggleDescription.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  // LS fn -->
  //  создаю ключ MYTODOSTATE = [] в LS
  setLocalState() {
    let localProp = localStorage.getItem(this.MYTODOSTATE);
    if (!localProp) {
      localStorage.setItem(this.MYTODOSTATE, JSON.stringify([]));
    }
  }

  getDataLocalStorage() {
    const state = localStorage.getItem(this.MYTODOSTATE);
    return JSON.parse(state);
  }
  updateLocalStorage() {
    localStorage.setItem(this.MYTODOSTATE, JSON.stringify(this.state.todoList));
  }
  updateStateTodoList() {
    let localTodoList = this.getDataLocalStorage();

    this.setState(({ todoList }) => {
      let newArr = todoList.slice(0);
      newArr = newArr.concat(localTodoList);
      return { todoList: newArr };
    });
  }

  //main fn -->
  createTodoItem(text) {
    return {
      description: text,
      createItem: new Date(),
      id: uuidv4(),
      done: false,
      show: true,
      editing: false,
    };
  }

  addItem(text) {
    const newItem = this.createTodoItem(text);

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

  toggleDescription(id, text) {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const oldItem = todoList[idx];
      const newItem = { ...oldItem, description: text, editing: false };

      return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  componentDidMount() {
    // localStorage.clear();
    this.setLocalState();
    this.updateStateTodoList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.todoList) !== this.state.todoList) {
      this.updateLocalStorage();
    }
  }

  render() {
    console.log(this.textConstants);
    const { todoList, filterList } = this.state;

    const doneCount = todoList.filter((el) => el.done).length;
    const todoCount = todoList.length - doneCount;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem.bind(this)} />
        <section className="main">
          <TaskList
            todos={todoList}
            onDeleted={this.deleteItem.bind(this)}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            chngeDescription={this.chngeDescription}
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
