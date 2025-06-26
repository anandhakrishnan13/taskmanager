import { Task } from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      assignedTo
    });
    


    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task status:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

