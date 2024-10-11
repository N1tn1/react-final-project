import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';
import style from './styles/AddTodoForm.module.css';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        setTodoTitle(event.target.value);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (todoTitle.trim() === '') return;
        onAddTodo({ title: todoTitle, isCompleted: false });
        setTodoTitle('');
    };
    
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel 
                todoTitle={todoTitle} 
                handleTitleChange={handleTitleChange}
                id="todo-title"
                placeholder="Enter your tasks here">
                <span className={style.visuallyHidden}>Task</span>
            </InputWithLabel>
            <button className={style.addbtn} type="submit"> Add Task </button>
        </form>
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;