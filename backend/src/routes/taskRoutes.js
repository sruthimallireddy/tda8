const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateRequest } = require('../middleware/validation');

// Geting  all tasks with filtering and searching
router.get('/', taskController.getAllTasks);

// Getting the statistics
router.get('/statistics/overview', taskController.getStatistics);

// POST it creates  a new task
router.post('/', validateRequest('createTask'), taskController.createTask);

// GET a single task by ID
router.get('/:id', taskController.getTaskById);

// PUT updating a task
router.put('/:id', validateRequest('updateTask'), taskController.updateTask);

// PATCH it marks task as complete
router.patch('/:id/complete', taskController.completeTask);

//  for Deleting a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
