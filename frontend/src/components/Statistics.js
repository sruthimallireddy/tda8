import React, { useState, useEffect } from 'react';
import '../styles/Statistics.css';
import { FaCheckCircle, FaClock, FaHourglassEnd, FaList } from 'react-icons/fa';

const Statistics = ({ stats, isLoading }) => {
  const [displayStats, setDisplayStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    byPriority: {}
  });

  useEffect(() => {
    if (stats) {
      setDisplayStats(stats);
    }
  }, [stats]);

  const getCompletionPercentage = () => {
    if (displayStats.total === 0) return 0;
    return Math.round((displayStats.completed / displayStats.total) * 100);
  };

  return (
    <div className="statistics-container">
      <h2>📊 Task Statistics</h2>

      {isLoading ? (
        <div className="stats-loading">Loading statistics...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon total">
                <FaList />
              </div>
              <div className="stat-content">
                <h3>Total Tasks</h3>
                <p className="stat-number">{displayStats.total}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon completed">
                <FaCheckCircle />
              </div>
              <div className="stat-content">
                <h3>Completed</h3>
                <p className="stat-number">{displayStats.completed}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <FaHourglassEnd />
              </div>
              <div className="stat-content">
                <h3>Pending</h3>
                <p className="stat-number">{displayStats.pending}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon in-progress">
                <FaClock />
              </div>
              <div className="stat-content">
                <h3>In Progress</h3>
                <p className="stat-number">{displayStats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="progress-section">
            <h3>Completion Progress</h3>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
              <p className="progress-text">
                {getCompletionPercentage()}% Complete
              </p>
            </div>
          </div>

          {displayStats.byPriority && Object.keys(displayStats.byPriority).length > 0 && (
            <div className="priority-breakdown">
              <h3>Tasks by Priority</h3>
              <div className="priority-stats">
                {displayStats.byPriority.high && (
                  <div className="priority-stat">
                    <span className="priority-label high">High</span>
                    <span className="priority-count">{displayStats.byPriority.high}</span>
                  </div>
                )}
                {displayStats.byPriority.medium && (
                  <div className="priority-stat">
                    <span className="priority-label medium">Medium</span>
                    <span className="priority-count">{displayStats.byPriority.medium}</span>
                  </div>
                )}
                {displayStats.byPriority.low && (
                  <div className="priority-stat">
                    <span className="priority-label low">Low</span>
                    <span className="priority-count">{displayStats.byPriority.low}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Statistics;
