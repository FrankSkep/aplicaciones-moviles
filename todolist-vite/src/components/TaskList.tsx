import React from 'react';
import { MdInbox } from 'react-icons/md';
import type { Task } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <MdInbox className="empty-icon" />
        <p className="empty-title">No hay tareas</p>
        <p className="empty-subtitle">Comienza agregando una nueva tarea</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};