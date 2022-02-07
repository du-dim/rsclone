import React from 'react';
import { ITodoItem } from '../../../types/types';

export const Todoitem:React.FC<ITodoItem> = (props) => {
  const { id, title, completed } = props;
  return (
    <div>
      <input type='checkbox' checked={completed} />
      {title}
      <button type='button'>x</button>
    </div>
  );
};

export default Todoitem;
