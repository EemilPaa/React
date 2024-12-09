// src/App.js
import './App.css';
import Home from './components/home';
import Todolist from './components/todolist';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Menu */}
        <nav>
          <Link to="/">Home</Link>{' '}
          <Link to="/todolist">Todo List</Link>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todolist" element={<Todolist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
