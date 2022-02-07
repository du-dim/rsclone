import React from 'react';
import { IToDo, ITodoItem } from '../../../types/types';

export const Todoitem:React.FC<ITodoItem> = (props) => {
  const {
    id, title, completed, removeTaskToDo, toggleToDo,
  } = props;
  return (
    <div className='todo-box__item'>
      <input type='checkbox' checked={completed} />
      {title}
      <button type='button'>X</button>
    </div>
  );
};

export default Todoitem;
