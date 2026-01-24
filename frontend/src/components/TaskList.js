import React from 'react';
import '../styles/TaskList.css';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete, onComplete, isLoading, isEmpty }) => {
  if (isEmpty) {
    return (
      <div className="task-list-empty">
        <div className="empty-state">
          <h3>📭 No tasks found</h3>
          <p>Create a new task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onComplete={onComplete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
