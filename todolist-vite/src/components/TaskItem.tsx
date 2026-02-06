import React from 'react';
import type { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox-wrapper">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
          id={`task-${task.id}`}
        />
      </div>
      
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <span className={`task-badge ${task.completed ? 'badge-completed' : 'badge-pending'}`}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
            <span className="task-date">{formatDate(task.createdAt)}</span>
          </div>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      
      <button
        onClick={() => onDelete(task.id)}
        className="btn btn-delete"
        aria-label="Eliminar tarea"
        title="Eliminar tarea"
      >
        <span className="delete-icon">×</span>
      </button>
    </div>
  );
};