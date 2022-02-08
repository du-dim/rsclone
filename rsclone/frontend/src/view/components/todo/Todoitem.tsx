import React from 'react';
import { ITodoItem } from '../../../types/types';

export const Todoitem:React.FC<ITodoItem> = (props) => {
  const {
    id, title, completed, removeTaskToDo, toggleToDo,
  } = props;
  return (
    <div className='todo-box__item'>
      <input type='checkbox' checked={completed} onChange={() => toggleToDo(id)} />
      {title}
      <button type='button' onClick={() => removeTaskToDo(id)}>
        X
      </button>
    </div>
  );
};

export default Todoitem;
