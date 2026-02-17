import { Router } from 'express';
import { body } from 'express-validator';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString(),
    body('priority').optional().isIn(['low', 'medium', 'high']),
  ],
  createTask
);

router.get('/', getTasks);

router.get('/:id', getTask);

router.put(
  '/:id',
  [
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
  ],
  updateTask
);

router.delete('/:id', deleteTask);

export default router;
