import React, { useEffect, useRef, useState } from 'react';
import { IToDo } from '../../../types/types';
import './todo.scss';
import Todolist from './Todolist';

export const Todo:React.FC = () => {
  // empty string for add task
  const [valueTask, setValueTask] = useState('');
  //  array for list tasks
  const [todos, setTodos] = useState<IToDo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueTask(e.target.value);
  };

  // function for add tasks tor array (*toDoList*)
  const addTaskToDo = () => {
    // check => task add if the task isn't empty only
    if (valueTask) {
      setTodos([...todos, {
        id: Date.now(),
        title: valueTask,
        completed: false,
      }]);
      // line is cleared after adding task
      setValueTask('');
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className='todo-box'>
      <div className='todo-box__input'>
        <input value={valueTask} onChange={handleChange} ref={inputRef} />
        <button type='button' onClick={addTaskToDo}>Add</button>
      </div>
      <Todolist items={todos} />
    </div>
  );
};
//* a task
// export interface IToDo {
//   id: number,
//   title: string,
//   complited: boolean,
// }
