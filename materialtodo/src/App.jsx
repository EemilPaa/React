import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';

function App() {
  const [todo, setTodo] = useState({ description: '', date: '' });
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = () => {
    if (!todo.description || !todo.date) {
      alert('Täyä päivämäärä ja kuvaus');
      return;
    }

    const newTodo = { ...todo, id: new Date().toISOString() };
    setTodos([...todos, newTodo]);
    setTodo({ description: '', date: '' });
  };

  const columns = [
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todolist</Typography>
        </Toolbar>
      </AppBar>

      <Stack direction="row" spacing={2} mt={2} justifyContent="center" alignItems="center">
        <TextField
          variant="standard"
          label="Description"
          name="description"
          value={todo.description}
          onChange={inputChanged}
        />
        <TextField
          variant="standard"
          label="Date"
          name="date"
          value={todo.date}
          onChange={inputChanged}
        />
        <Button color="primary" onClick={addTodo}>
          <SaveIcon />
          Add
        </Button>
      </Stack>

      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={todos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </>
  );
}

export default App;
