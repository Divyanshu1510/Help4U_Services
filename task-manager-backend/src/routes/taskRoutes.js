import { Router } from 'express';
const router = Router();
import { getAllTasks, createTask, getTaskById, updateTaskById, deleteTaskById } from '../controllers/taskController';


router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTaskById);
router.delete('/tasks/:id', deleteTaskById);

export default router;
