// src/components/Todolist.jsx
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Todolist() {
  const [todo, setTodo] = useState({ description: '', date: '', status: '' });
  const [todos, setTodos] = useState([]);

  const columnDefs = [
    { field: 'description' },
    { field: 'date' },
    { field: 'status' },
  ];

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: '', date: '', status: '' });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        placeholder="Description"
        name="description"
        value={todo.description}
        onChange={inputChanged}
      />
      <input
        placeholder="Date"
        name="date"
        value={todo.date}
        onChange={inputChanged}
      />
      <input
        placeholder="Status"
        name="status"
        value={todo.status}
        onChange={inputChanged}
      />
      <button onClick={addTodo}>Add</button>
      <div className="ag-theme-material" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={todos} columnDefs={columnDefs} />
      </div>
    </div>
  );
}

export default Todolist;
