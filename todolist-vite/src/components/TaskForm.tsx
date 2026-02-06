import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { MdAdd } from 'react-icons/md';
import type { TaskFormData } from '../types/Task';

interface TaskFormProps {
  onAddTask: (task: TaskFormData) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('El título es obligatorio');
      return;
    }

    const taskData: TaskFormData = {
      title: title.trim(),
      description: description.trim() || undefined,
    };

    onAddTask(taskData);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Título
        </label>
        <input
          id="task-title"
          type="text"
          placeholder="Escribe el título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          maxLength={100}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="task-description" className="form-label">
          Descripción <span className="optional-text">(opcional)</span>
        </label>
        <textarea
          id="task-description"
          placeholder="Agrega más detalles sobre la tarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          maxLength={300}
          rows={3}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        <MdAdd className="btn-icon" />
        Agregar Tarea
      </button>
    </form>
  );
};