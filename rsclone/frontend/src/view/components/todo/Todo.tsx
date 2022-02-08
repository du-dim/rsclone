import React, { useEffect, useRef, useState } from 'react';
import { IToDo } from '../../../types/types';
import './todo.scss';
import Todolist from './Todolist';

export const Todo:React.FC = () => {
  // empty string for add task
  const [valueTask, setValueTask] = useState('');

  //  array for list tasks
  const [todos, setTodos] = useState<IToDo[]>(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem('todos');
    console.log(savedTodos);
    // if there are todos stored
    if (savedTodos) {
      // return the parsed JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    }
    // return an empty array
    return [];
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const maxLentgTask = 30;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // function for add tasks tor array (*toDoList*)
  function addTaskToDo() {
    if (todos.length < 10) {
      // check => task add if the task isn't empty only
      if (valueTask) {
        setTodos([...todos, {
          id: Date.now(),
          title: valueTask.trim(),
          completed: false,
        }]);
        // line is cleared after adding task
        setValueTask('');
      }
    } else {
      alert('There are 24 hours in a day!Just... be careful, okay?');
    }
  }

  const removeTaskToDo = (id:number):void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleToDo = (id:number):void => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }
      return {
        ...todo,
        completed: !todo.completed,
      };
    }));
  };
  // show all changes in input-text
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueTask(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addTaskToDo();
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className='todo-box'>
      <div className='todo-box__input'>
        <input
          value={valueTask}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          placeholder='What to do?'
          maxLength={maxLentgTask}
        />
        <button type='button' onClick={addTaskToDo}>Add</button>
      </div>
      <Todolist items={todos} removeTaskToDo={removeTaskToDo} toggleToDo={toggleToDo} />
    </div>
  );
};
//* a task
// export interface IToDo {
//   id: number,
//   title: string,
//   complited: boolean,
// }
