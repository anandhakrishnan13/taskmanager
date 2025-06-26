import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [showMenu, setShowMenu] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === 'All' || task.status === statusFilter;
    const assigneeMatch = assigneeFilter === 'All' || task.assignedTo === assigneeFilter;
    return statusMatch && assigneeMatch;
  });

  const uniqueAssignees = [...new Set(tasks.map((t) => t.assignedTo))];

  return (
    <div className="tasklist-container">
      <Link to="/">
        <button className="back-btn">← Back to Create Task</button>
      </Link>

      <h3>📋 All Tasks</h3>


      <div className="tabs-container">
        <div className="tabs">
          <input type="radio" id="radio-all" name="tabs" checked={statusFilter === 'All'} onChange={() => setStatusFilter('All')} />
          <label className="tab" htmlFor="radio-all">All</label>

          <input type="radio" id="radio-todo" name="tabs" checked={statusFilter === 'To Do'} onChange={() => setStatusFilter('To Do')} />
          <label className="tab" htmlFor="radio-todo">To do</label>

          <input type="radio" id="radio-inprogress" name="tabs" checked={statusFilter === 'In Progress'} onChange={() => setStatusFilter('In Progress')} />
          <label className="tab" htmlFor="radio-inprogress">In progress</label>

          <input type="radio" id="radio-done" name="tabs" checked={statusFilter === 'Done'} onChange={() => setStatusFilter('Done')} />
          <label className="tab" htmlFor="radio-done">Done</label>

          <span className="glider"></span>
        </div>
      </div>

      <div className="filter-wrapper">
        <button className="filter-btn" onClick={() => setShowMenu(!showMenu)}>
          <FaBars />
          {assigneeFilter === 'All' ? 'Filter by Assignee' : `Assignee: ${assigneeFilter}`}
        </button>

        {showMenu && (
          <div className="filter-dropdown">
            <div className="filter-item" onClick={() => {
              setAssigneeFilter('All');
              setShowMenu(false);
            }}>
              All Assignees
            </div>
            {uniqueAssignees.map((name) => (
              <div
                key={name}
                className={`filter-item ${assigneeFilter === name ? 'active' : ''}`}
                onClick={() => {
                  setAssigneeFilter(name);
                  setShowMenu(false);
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-content">
                <div className="task-details">
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <small>Assigned to: {task.assignedTo}</small><br />
                  <small>Status: {task.status}</small>
                </div>
                <Link to={`/edit/${task._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
