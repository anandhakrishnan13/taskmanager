import express from 'express';
import { createTask, getAllTasks, updateTaskStatus, deleteTask } from '../Controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks); 
router.patch('/:id', updateTaskStatus);
router.delete('/:id', deleteTask); 

export default router;


