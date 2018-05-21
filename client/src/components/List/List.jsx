import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Done from '@material-ui/icons/Done';
import Delete from '@material-ui/icons/DeleteForever';

import styles from './list.css';
import TodoInput from '../TodoInput/TodoInput';
import { TaskButton } from '../Buttons/Buttons';

const List = ({
  category,
  enter,
  enterActive,
  exit,
  exitActive,
  handleAdd,
  handleDelete,
  handleInputChange,
  handleUpdate,
  task,
  title,
  todoCard,
  todoList,
  todos
}) => (
  <div className={styles[todoList]}>
    <h3 className={styles[category]}>{title}</h3>
    {title === 'In Progress' ? (
      <TodoInput task={task} handleInputChange={handleInputChange} handleAdd={handleAdd} />
    ) : null}
    <TransitionGroup component={null}>
      {todos
        .filter(item => {
          if (title === 'In Progress') {
            return !item.completed;
          }
          return item.completed;
        })
        .map(({ stateId, _id, text }) => (
          <CSSTransition
            key={stateId}
            timeout={600}
            className={styles[todoCard]}
            classNames={{
              enter: styles[enter],
              enterActive: styles[enterActive],
              exit: styles[exit],
              exitActive: styles[exitActive]
            }}
          >
            <section>
              <p>{text}</p>
              <div>
                {title === 'In Progress' ? (
                  <TaskButton todoid={_id} stateId={stateId} handleTask={handleUpdate} name="complete">
                    <Done nativeColor="#19e63b" />
                  </TaskButton>
                ) : null}
                <TaskButton todoid={_id} stateId={stateId} handleTask={handleDelete} name="delete">
                  <Delete nativeColor="#f61221" />
                </TaskButton>
              </div>
            </section>
          </CSSTransition>
        ))}
    </TransitionGroup>
  </div>
);

List.propTypes = {
  category: PropTypes.string.isRequired,
  enter: PropTypes.string.isRequired,
  enterActive: PropTypes.string.isRequired,
  exit: PropTypes.string.isRequired,
  exitActive: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  todoCard: PropTypes.string.isRequired,
  todoList: PropTypes.string.isRequired,
  todos: PropTypes.array.isRequired
};

export default List;
