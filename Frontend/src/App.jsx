// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EditTask from './components/EditTask';


function App() {
  return (
    <Router>
      <div>
        <h2 style={{ textAlign: 'center' }}>📝 Task Manager</h2>
        <Routes>
          <Route path="/" element={<TaskForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
