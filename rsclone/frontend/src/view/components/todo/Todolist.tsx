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
  return (
    <div className='todo-box__output'>
      {
       // eslint-disable-next-line react/destructuring-assignment
       // eslint-disable-next-line react/jsx-props-no-spreading
       props.items.map((todo) => <Todoitem key={todo.id} {...todo} />)
     }

    </div>
  );
};

export default Todolist;
