import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem'; 
import style from './styles/TodoList.module.css';

const TodoList = ({ todoList, onRemoveTodo, onToggleTodo }) => {
    const completedTodos = todoList.filter(todo => todo.isCompleted);
    const activeTodos = todoList.filter(todo => !todo.isCompleted);
    
    return (
        <div className={style.todoContainer}> 
            {activeTodos.length === 0 ? (
                <div className={style.notCompleted}>
                    <p style={{ fontStyle: 'italic' }}>No Active Tasks.</p>
                </div>
                ) : (
            
                        <div className={style.activeTasks}>
                            <h2>Active Tasks</h2>
                            <ul className={style.todoList}>
                                {activeTodos.map(todo => (
                                    <TodoListItem 
                                        key={todo.id} 
                                        todo={todo} 
                                        onRemoveTodo={onRemoveTodo} 
                                        onToggleTodo={onToggleTodo}
                                    />
                                ))}
                            </ul>
                        </div>
                    )
            }
        
            {completedTodos.length > 0 && ( 
                <div className={style.completedTasks}>
                    <h2>Completed Tasks</h2>
                    <ul className={style.todoList}>
                        {completedTodos.map(todo => (
                            <TodoListItem 
                                key={todo.id} 
                                todo={todo} 
                                onRemoveTodo={onRemoveTodo} 
                                onToggleTodo={onToggleTodo}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
         
TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            isCompleted: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
};

export default TodoList;