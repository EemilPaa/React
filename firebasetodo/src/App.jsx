import { useState, useEffect } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddTodo from './AddTodo';  // Import AddTodo component

function App() {
  const [todos, setTodos] = useState([]);

  const columnDefs = [
    { field: 'description', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true },
    {
      headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: params => 
        <IconButton onClick={() => deleteTodo(params.value)} size="small" color="error">
          <DeleteIcon />
        </IconButton>
    }
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://[YOUR_APPID].firebasedatabase.app/items/.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      .catch(err => console.error(err));
  };

  // Add keys to the todo objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] })
    );
    setTodos(valueKeys);
  };

  // Update the todos list locally after adding a new todo to Firebase
  const addTodo = (newTodo) => {
    fetch('https://[YOUR_APPID].firebasedatabase.app/items/.json', {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(data => {
        // Add the new todo to the state immediately
        setTodos(prevTodos => [
          ...prevTodos,
          { ...newTodo, id: data.name } // Assuming Firebase returns the id as `name`
        ]);
      })
      .catch(err => console.error(err));
  };

  const deleteTodo = (id) => {
    fetch(`https://[YOUR_APPID].firebasedatabase.app/items/${id}.json`, {
      method: 'DELETE',
    })
      .then(response => fetchItems())
      .catch(err => console.error(err));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            TodoList
          </Typography>
        </Toolbar>
      </AppBar>
      <AddTodo addTodo={addTodo} /> {/* Using AddTodo component */}
      <div className="ag-theme-material" style={{ height: 400, width: 700 }}>
        <AgGridReact 
          rowData={todos}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}

export default App;
