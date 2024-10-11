import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import style from './styles/TodoContainer.module.css';

const TodoContainer = ({ tableName }) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            },
        };
  
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view`;
  
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();

            const sortedData = data.records.map(record => ({
                id: record.id,
                title: record.fields.title,
                isCompleted: record.fields.isCompleted !== undefined ? record.fields.isCompleted : false,
                createdTime: record.fields.createdTime
            })).sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
  
            setTodoList(sortedData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setError("Failed to fetch tasks. Please try again later.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addTodo = async (newTodo) => {
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    title: newTodo.title,
                    isCompleted: false
                },
            }),
        };

        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`;

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Error adding task: ${response.status} - ${JSON.stringify(errorDetails)}`);
            }
            const data = await response.json();

            setTodoList(prevTodos => [
                ...prevTodos, 
                {
                    ...data.fields, 
                    id: data.id, 
                    title: newTodo.title,
                    createdTime: data.createdTime || new Date() 
                }
            ].sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))); 


        } catch (error) {
            console.error("Error adding task:", error.message);
            setError("Failed to add task. Please try again.")
        }
    };

    const removeTodo = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        };

        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`;
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error removing task: ${response.statusText}`);
            }
            setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Error Removing Task:", error);
            setError("Failed to remove task. Please try again.");
        }
    };

    const toggleTodo = async (id) => {
        const todoToUpdate = todoList.find(todo => todo.id === id);
        const updatedTodo = { ...todoToUpdate, isCompleted: !todoToUpdate.isCompleted };
    
        const options = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    isCompleted: updatedTodo.isCompleted,
                },
            }),
        };
    
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`;
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error updating task: ${response.status}`);
            }
            setTodoList(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === id ? updatedTodo : todo
                )
            );
        } catch (error) {
            console.error("Error updating task:", error.message);
        }
    };

    return (
        <div className={style.todoContainer}>
            <div className={style.header}>
                <h1> {tableName} </h1>
            </div>
            <div className={style.addtodoForm}>
                <AddTodoForm onAddTodo={addTodo} />
            </div>
            <div className="tasksContainer">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <TodoList 
                        todoList={todoList} 
                        onRemoveTodo={removeTodo} 
                        onToggleTodo={toggleTodo} 
                    />
                )}
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
    );
};

TodoContainer.propTypes = {
    tableName: PropTypes.string.isRequired,
};
export default TodoContainer;