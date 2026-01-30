import React, { useState, useEffect } from 'react';
import './App.css';
import taskAPI from './services/taskAPI';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import Statistics from './components/Statistics';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  // Fetching all tasks
  const fetchTasks = async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskAPI.getAllTasks(filters);
      setTasks(response.data.data);
      setFilteredTasks(response.data.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetching thee statistics
  const fetchStatistics = async () => {
    try {
      const response = await taskAPI.getStatistics();
      setStats(response.data.data);
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    }
  };

  // this is for Initial load
  useEffect(() => {
    fetchTasks();
    fetchStatistics();
  }, []);

  // this is for  creating a new task
  const handleCreateTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data.data, ...tasks]);
      setFilteredTasks([response.data.data, ...filteredTasks]);
      fetchStatistics();
      alert('Task created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // this is for a updating a task
  const handleUpdateTask = async (taskId, updatedData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskAPI.updateTask(taskId, updatedData);
      const updatedTask = response.data.data;

      setTasks(tasks.map(task => task._id === taskId ? updatedTask : task));
      setFilteredTasks(filteredTasks.map(task => task._id === taskId ? updatedTask : task));
      fetchStatistics();
      alert('Task updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // for deleting a task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsLoading(true);
      setError(null);
      try {
        await taskAPI.deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
        setFilteredTasks(filteredTasks.filter(task => task._id !== taskId));
        fetchStatistics();
        alert('Task deleted successfully!');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // for completing a task
  const handleCompleteTask = async (taskId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskAPI.completeTask(taskId);
      const completedTask = response.data.data;

      setTasks(tasks.map(task => task._id === taskId ? completedTask : task));
      setFilteredTasks(filteredTasks.map(task => task._id === taskId ? completedTask : task));
      fetchStatistics();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete task');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // for a filtering tasks
  const handleFilter = async (filters) => {
    setCurrentFilters(filters);
    await fetchTasks(filters);
  };

  // for searching tasks
  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      await fetchTasks(currentFilters);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskAPI.searchTasks(searchQuery);
      setFilteredTasks(response.data.data);
    } catch (err) {
      setError('Failed to search tasks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // for resetting filters
  const handleReset = async () => {
    setCurrentFilters({});
    await fetchTasks();
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>📋 To-Do List App</h1>
          <p>Stay organized and productive</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {error && (
            <div className="error-message">
              <span>{error}</span>
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          <TaskForm onTaskCreate={handleCreateTask} isLoading={isLoading} />

          <Statistics stats={stats} isLoading={isLoading} />

          <FilterBar
            onFilter={handleFilter}
            onSearch={handleSearch}
            onReset={handleReset}
            isLoading={isLoading}
          />

          <TaskList
            tasks={filteredTasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
            isLoading={isLoading}
            isEmpty={filteredTasks.length === 0}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2026 To-Do List App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
