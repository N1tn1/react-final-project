import React from 'react';
import PropTypes from 'prop-types';
import style from './styles/TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo, onToggleTodo }) => {
    return (
        <li className={style.ListItem}>
            <div className={style.todoContent}>
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => onToggleTodo(todo.id)}
                />
                <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none', cursor: 'pointer' }}>
                    {todo.title}
                </span>
            </div>
            <button className={style.rmvbtn} onClick={() => onRemoveTodo(todo.id)}> Remove </button>
        </li>
    
    );
};

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
};

export default TodoListItem;