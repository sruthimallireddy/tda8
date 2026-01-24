import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Task API calls
const taskAPI = {
  // Get all tasks with optional filters
  getAllTasks: (params = {}) => {
    return apiClient.get('/tasks', { params });
  },

  // Get a single task
  getTaskById: (id) => {
    return apiClient.get(`/tasks/${id}`);
  },

  // Create a new task
  createTask: (taskData) => {
    return apiClient.post('/tasks', taskData);
  },

  // Update a task
  updateTask: (id, taskData) => {
    return apiClient.put(`/tasks/${id}`, taskData);
  },

  // Mark task as complete
  completeTask: (id) => {
    return apiClient.patch(`/tasks/${id}/complete`);
  },

  // Delete a task
  deleteTask: (id) => {
    return apiClient.delete(`/tasks/${id}`);
  },

  // Get task statistics
  getStatistics: () => {
    return apiClient.get('/tasks/statistics/overview');
  },

  // Search tasks
  searchTasks: (searchQuery) => {
    return apiClient.get('/tasks', { params: { search: searchQuery } });
  },

  // Filter tasks
  filterTasks: (filters) => {
    return apiClient.get('/tasks', { params: filters });
  }
};

export default taskAPI;
