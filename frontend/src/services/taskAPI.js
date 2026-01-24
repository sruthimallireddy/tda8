import axios from 'axios';

// Backend base URL (without /api)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const taskAPI = {
  // Axios automatically adds /api/tasks to the base URL
  getAllTasks: (params = {}) => apiClient.get('/api/tasks', { params }),
  getTaskById: (id) => apiClient.get(`/api/tasks/${id}`),
  createTask: (taskData) => apiClient.post('/api/tasks', taskData),
  updateTask: (id, taskData) => apiClient.put(`/api/tasks/${id}`, taskData),
  completeTask: (id) => apiClient.patch(`/api/tasks/${id}/complete`),
  deleteTask: (id) => apiClient.delete(`/api/tasks/${id}`),
  getStatistics: () => apiClient.get('/api/tasks/statistics/overview'),
  searchTasks: (searchQuery) => apiClient.get('/api/tasks', { params: { search: searchQuery } }),
  filterTasks: (filters) => apiClient.get('/api/tasks', { params: filters }),
};

export default taskAPI;
