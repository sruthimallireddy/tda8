import React, { useState } from 'react';
import '../styles/FilterBar.css';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const FilterBar = ({ onFilter, onSearch, onReset, isLoading }) => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    sortBy: 'createdAt'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleApplyFilters = () => {
    const activeFilters = {};
    if (filters.status) activeFilters.status = filters.status;
    if (filters.priority) activeFilters.priority = filters.priority;
    if (filters.category) activeFilters.category = filters.category;
    if (filters.sortBy) activeFilters.sortBy = filters.sortBy;

    onFilter(activeFilters);
    setShowFilters(false);
  };

  const handleReset = () => {
    setFilters({
      status: '',
      priority: '',
      category: '',
      sortBy: 'createdAt'
    });
    setSearchQuery('');
    onReset();
    setShowFilters(false);
  };

  return (
    <div className="filter-bar">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
          className="search-input"
        />
        <button type="submit" className="btn-search" disabled={isLoading}>
          <FaSearch />
        </button>
      </form>

      <div className="filter-controls">
        <button
          className="btn-filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          disabled={isLoading}
        >
          <FaFilter /> Filters
        </button>

        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label>Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Priority</label>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Filter by category"
                value={filters.category}
                onChange={handleFilterChange}
                disabled={isLoading}
              />
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                disabled={isLoading}
              >
                <option value="createdAt">Date Created</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="filter-actions">
              <button
                className="btn-apply"
                onClick={handleApplyFilters}
                disabled={isLoading}
              >
                Apply
              </button>
              <button
                className="btn-reset"
                onClick={handleReset}
                disabled={isLoading}
              >
                <FaTimes /> Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
