import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskListHooks from '../TaskListHooks/TaskListHooks';
import Footer from '../Footer/Footer';
import { createTodoItem } from '../SupportFunction/createTodoItem';
import { toggleProperty } from '../SupportFunction/toggleProperty';
import { getOldItem } from '../SupportFunction/getOldItem';

import '../../index.css';
const AppHooks = () => {
  const [todoList, setTodoList] = useState([createTodoItem('first', 600)]);

  const [filterList] = useState([
    { activFilter: true, name: 'all' },
    { activFilter: true, name: 'active' },
    { activFilter: true, name: 'completed' },
  ]);

  //        >>>>>>>>    функции по работе с локалстредж
  // =---------------------------------------------------------------
  // setLocalState() {
  //   let localProp = localStorage.getItem(MYTODOSTATE);
  //   if (!localProp) {
  //     localStorage.setItem(MYTODOSTATE, JSON.stringify([]));
  //   }
  // }
  // getDataLocalStorage() {
  //   const state = localStorage.getItem(MYTODOSTATE);
  //   return JSON.parse(state);
  // }
  // updateLocalStorage() {
  //   localStorage.setItem(MYTODOSTATE, JSON.stringify(this.state.todoList));
  // }
  // updateStateTodoList() {
  //   let localTodoList = this.getDataLocalStorage();

  //   this.setState(({ todoList }) => {
  //     let newArr = todoList.slice(0);
  //     newArr = newArr.concat(localTodoList);
  //     return { todoList: newArr };
  //   });
  // }
  let alt = 1;
  console.log(alt);
  //        >>>>        функции передаваемые в компоненты
  // -----------------------------------------------------------

  // clearTaskList() {
  //   this.setState(({ todoList }) => {
  //     const newArr = todoList.filter((el) => {
  //       return el.done !== true;
  //     });
  //     return { todoList: newArr };
  //   });
  // }

  // onPause(id) {
  //   clearInterval(this.inteerval);
  //   this.setState(({ todoList }) => {
  //     const idx = todoList.findIndex((el) => el.id === id);
  //     const oldItem = todoList[idx];
  //     const newItem = { ...oldItem, play: false };
  //     return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
  //   });
  // }

  const doneCount = todoList.filter((el) => el.done).length;
  const todoCount = todoList.length - doneCount;

  const countdown = (id) => {
    setTodoList((todoList) => {
      const newTodoList = toggleProperty(todoList, id, 'play');
      return [...newTodoList];
    });
    const oldItem = getOldItem(todoList, id);
    console.log(oldItem.play);
    if (!oldItem.play) {
      setInterval(() => {
        setTodoList((todoList) => {
          const oldItem = getOldItem(todoList, id);
          if (oldItem.fullTime > 0) {
            const idx = todoList.findIndex((el) => el.id === id);
            const newItem = { ...oldItem, play: true, fullTime: oldItem.fullTime - 1 };
            const newTodoList = [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)];
            return [...newTodoList];
          }
        });
      }, 1000);
    }
  };

  return (
    <section className="todoapp">
      <NewTaskForm
        onItemAdded={(text, fullTime) => {
          let newItem = createTodoItem(text, fullTime);
          setTodoList((todoList) => {
            return [...todoList, newItem];
          });
        }}
      />
      <section className="main">
        <TaskListHooks
          todos={todoList}
          onDeleted={(id) => {
            setTodoList((todoList) => {
              const idx = todoList.findIndex((el) => el.id === id);
              const newTodoList = [...todoList.slice(0, idx), ...todoList.slice(idx + 1)];
              return [...newTodoList];
            });
          }}
          onToggleDone={(id) => {
            setTodoList((todoList) => {
              const newTodoList = toggleProperty(todoList, id, 'done');
              return [...newTodoList];
            });
          }}
          onToggleEdit={(id) => {
            setTodoList((todoList) => {
              const newTodoList = toggleProperty(todoList, id, 'editing');
              return [...newTodoList];
            });
          }}
          chngeDescription={(id, text) => {
            setTodoList((todoList) => {
              const newTodoList = toggleProperty(todoList, id, 'editing', 'description', text);
              return [...newTodoList];
            });
          }}
          onPlay={(id) => {
            countdown(id);
          }}
          onPause={(id) => {
            // clearInterval();
            setTodoList((todoList) => {
              const newTodoList = toggleProperty(todoList, id, 'play');
              return [...newTodoList];
            });
          }}
        />

        <Footer
          toDo={todoCount}
          filterList={filterList}
          // clearTaskList={this.clearTaskList.bind(this)}
          // toggleFilter={this.toggleFilter}
        />
      </section>
    </section>
  );
};

export default AppHooks;
