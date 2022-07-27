import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.store';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.warn("Get Todoso: " + JSON.stringify(storeTodos));
    if (storeTodos) {
      console.warn("Inside Todoso!!");
      setTodos(storeTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo() {
    const theName = todoNameRef.current.value;
    if (theName) {
      console.warn(theName);
      setTodos(prevTodos => {
        const theTodos = [...prevTodos, { id: uuidv4(), name: theName, complete: false}];
        console.warn("theTodos length: " + theTodos.length);
        return theTodos;
      })
    }
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    setTodos(todos.filter(todo => !todo.complete));
  }

  return (
    <>
      <TodoList todos={ todos } toggleTodo={ toggleTodo }/>
      <br/><br/>
      Enter Todo: <input ref={ todoNameRef } type="text" />
      <br/><br/>
      <button onClick={ handleAddTodo }>Add Todo</button>&nbsp;&nbsp;
      <button onClick={handleClearTodos}>Clear Completed Todo's</button>
      <br/><br/>
      <div>{ todos.filter(todo => !todo.complete).length } todo(s) remaining</div>
    </>
  )
}

export default App;
