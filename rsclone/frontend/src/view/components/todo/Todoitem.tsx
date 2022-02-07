import React from 'react';
import { IToDo } from '../../../types/types';

export const Todoitem:React.FC<IToDo> = (props) => {
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
