const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateRequest } = require('../middleware/validation');

// GET all tasks with filtering and searching
router.get('/', taskController.getAllTasks);

// GET statistics
router.get('/statistics/overview', taskController.getStatistics);

// POST create a new task
router.post('/', validateRequest('createTask'), taskController.createTask);

// GET a single task by ID
router.get('/:id', taskController.getTaskById);

// PUT update a task
router.put('/:id', validateRequest('updateTask'), taskController.updateTask);

// PATCH mark task as complete
router.patch('/:id/complete', taskController.completeTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
