import React, { useState } from 'react';
import '../styles/TaskItem.css';
import { FaEdit, FaTrash, FaClock, FaExclamationCircle } from 'react-icons/fa';

const TaskItem = ({ task, onUpdate, onDelete, onComplete, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    category: task.category,
    tags: task.tags
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    await onUpdate(task._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      category: task.category,
      tags: task.tags
    });
    setIsEditing(false);
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return <FaExclamationCircle />;
    if (priority === 'medium') return <FaClock />;
    return null;
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-content">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            className="edit-input"
            disabled={isLoading}
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            className="edit-textarea"
            rows="3"
            disabled={isLoading}
          />
          <div className="edit-controls">
            <select
              name="priority"
              value={editData.priority}
              onChange={handleEditChange}
              disabled={isLoading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              name="status"
              value={editData.status}
              onChange={handleEditChange}
              disabled={isLoading}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleEditChange}
              disabled={isLoading}
            />
            <input
              type="text"
              name="category"
              value={editData.category}
              onChange={handleEditChange}
              placeholder="Category"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="task-actions">
          <button
            className="btn-save"
            onClick={handleSaveEdit}
            disabled={isLoading}
          >
            Save
          </button>
          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.status} ${getPriorityClass(task.priority)}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onComplete(task._id)}
          disabled={isLoading}
        />
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className={task.status === 'completed' ? 'completed-title' : ''}>
            {task.title}
          </h3>
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {getPriorityIcon(task.priority)} {task.priority}
          </span>
          <span className={`status-badge status-${task.status}`}>
            {task.status}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-metadata">
          {task.category && (
            <span className="task-category">📁 {task.category}</span>
          )}
          {task.dueDate && (
            <span className="task-due-date">
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          {task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {task.completedAt && (
          <p className="completed-date">
            ✓ Completed on {new Date(task.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="task-actions">
        <button
          className="btn-edit"
          onClick={() => setIsEditing(true)}
          title="Edit task"
          disabled={isLoading}
        >
          <FaEdit />
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(task._id)}
          title="Delete task"
          disabled={isLoading}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
