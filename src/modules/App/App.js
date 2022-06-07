import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import '../../index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.maxID = 1;
    this.state = {
      todoList: [
        this.createTodoItem('Complieted task'),
        this.createTodoItem('sad task'),
        this.createTodoItem('Active task'),
      ],
      filterList: [
        { activFilter: true, name: 'all' },
        { activFilter: true, name: 'active' },
        { activFilter: true, name: 'completed' },
      ],
    };

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

        if (name === 'all') {
          newTodoList = todoList.map((el) => {
            el.show = true;
            return el;
          });
        } else if (name === 'active') {
          newTodoList = todoList.map((el) => {
            el.show = true;
            if (el.done) {
              el.show = false;
            }
            return el;
          });
        } else if (name === 'completed') {
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

  toggleDescription(id, text) {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const oldItem = todoList[idx];
      const newItem = { ...oldItem, description: text, editing: false };

      return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
    });
  }

  createTodoItem(text) {
    return {
      description: text,
      createItem: new Date(),
      id: this.maxID++,
      done: false,
      show: true,
      editing: false,
    };
  }

  deleteItem(id) {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((el) => el.id === id);
      const newArray = [...todoList.slice(0, idx), ...todoList.slice(idx + 1)];
      return { todoList: newArray };
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  clearTaskList() {
    this.setState(({ todoList }) => {
      const newArr = todoList.filter((el) => {
        return el.done !== true;
      });
      return { todoList: newArr };
    });
  }

  render() {
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
