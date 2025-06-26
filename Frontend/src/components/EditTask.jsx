import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EditTask.css';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get('http://localhost:3000/tasks');
        const found = res.data.find((t) => t._id === id);
        if (found) {
          setTask(found);
          setNewStatus(found.status);
        }
      } catch (err) {
        console.error('Failed to fetch task:', err.message);
      }
    };
    fetchTask();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, {
        status: newStatus,
      });
      alert('Task status updated!');
      navigate('/tasks');
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      alert('Task deleted!');
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to delete task:', err.message);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <div className="edit-task-container">
      <Link to="/tasks">
        <button className="back-btn">← Back to Task List</button>
      </Link>

      <h3>✏️ Edit Task</h3>

      {task ? (
        <div className="edit-task-card">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Assigned To:</strong> {task.assignedTo}</p>

          <label><strong>Status:</strong></label>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="button-group">
            <button className="save-btn" onClick={handleStatusUpdate}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className="delete-btn" onClick={handleDelete}>Delete Task</button>
          </div>
        </div>
      ) : (
        <p>Loading task...</p>
      )}
    </div>
  );
};

export default EditTask;
