import { useState } from 'react';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// Import the ReactiveButton component
import ReactiveButton from 'reactive-button';

function App() {
  const [todo, setTodo] = useState({description: '', date: '', status: ''});
  const [todos, setTodos] = useState([]);

  // Column definitions for ag-grid with column dragging disabled
  const columnDefs = [
    { field: 'description', suppressMovable: true },
    { field: 'date', suppressMovable: true },
    { field: 'status', suppressMovable: true }
  ];

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: '', status: ''});
  };

  return (
    <div className="container">
      {/* Container for input fields */}
      <div className="input-container">
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
      </div>

      {/* Position the button independently of the input fields */}
      <div className="button-container">
        <ReactiveButton 
          onClick={addTodo} 
          buttonState="idle" 
          color="blue"
          idleText="Add"
          size="medium"
        />
      </div>
      
      <div className="ag-theme-material" style={{height: 400, width: 600}}>
        <AgGridReact
          rowData={todos}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
}

export default App;
