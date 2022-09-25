import React, { useState, useReducer } from "react";

import './App.css';

const initialState = { todos: [] }

const ACTIONS = {
  ADD: 'add-todo',
  TOGGLE: 'toggle-todo',
  DELETE: 'delete-todo'
}

function reducer(state, action) {
  const { todos } = state;

  switch (action.type) {
    case ACTIONS.ADD:
      return { todos: [...todos, { id: Date.now(), name: action.payload.value, complete: false }]}
    case ACTIONS.TOGGLE:
      return { todos: todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      })}
    case ACTIONS.DELETE:
      return { todos: todos.filter(todo => todo.id !== action.payload.id)}
    default:
      return state
  }
}

function App() {
  const [value, setValue] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD, payload: { value: value } })
    setValue('')
  }

  return (
    <div className="App">
      <h1>To-do List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {state.todos.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} />)}

    </div>
  );
}

function Todo({ todo, dispatch }) {
  return (
    <div className={`todo ${todo.complete ? 'complete' : ''}`}>
      <div className="box" onClick={() => dispatch({ type: ACTIONS.TOGGLE, payload: { id: todo.id }})}></div>
      <span className="name">{todo.name}</span>
      <span className="delete" onClick={() => dispatch({ type: ACTIONS.DELETE, payload: { id: todo.id }})}>x</span>
    </div>
  )
}



export default App;
