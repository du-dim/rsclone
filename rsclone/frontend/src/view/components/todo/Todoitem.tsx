import React from 'react';
import { ITodoItem } from '../../../types/types';

export const Todoitem:React.FC<ITodoItem> = (props) => {
  const {
    id, title, completed, removeTaskToDo, toggleToDo,
  } = props;
  return (
    <div className='todo-box__item'>
      {/* <input type='checkbox' checked={completed} onChange={() => toggleToDo(id)} /> */}
      <div
        className='task-item'
        style={{ textDecoration: !completed ? 'none' : 'line-through' }}
        onClick={() => toggleToDo(id)}
      >
        {title}
      </div>
      <button className='delete-btn' type='button' onClick={() => removeTaskToDo(id)} aria-label='delete'>X</button>
    </div>
  );
};

export default Todoitem;
