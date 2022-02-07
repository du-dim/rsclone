/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { ITodolistProps } from '../../../types/types';
import Todoitem from './Todoitem';

/*  *--array tasks--*
*   export interface ITodolistProps {
*   items: IToDo[],
*  }
*/

const Todolist:React.FC<ITodolistProps> = (props) => {
  const { items, removeTaskToDo, toggleToDo } = props;
  return (
    <div className='todo-box__output'>
      {
       // eslint-disable-next-line react/destructuring-assignment
       // eslint-disable-next-line react/jsx-props-no-spreading
      items.map((todo) => (
        <Todoitem
          key={todo.id}
          toggleToDo={toggleToDo}
          removeTaskToDo={removeTaskToDo}
          {...todo}
        />
      ))
     }

    </div>
  );
};

export default Todolist;
