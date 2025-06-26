import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TaskForm.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://taskmanager-sb4l.onrender.com/tasks', {
        title,
        description,
        assignedTo,
      });
      alert('Task created!');
      setTitle('');
      setDescription('');
      setAssignedTo('');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to create task');
    }
  };

  return (
    <div className="form-container">
      <h3>Create Task</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Add Task</button>
      </form>

      <div className="view-task-btn-wrapper">
        <Link to="/tasks">
          <button className="view-task-btn">View Tasks</button>
        </Link>
      </div>
    </div>
  );
};

export default TaskForm;
