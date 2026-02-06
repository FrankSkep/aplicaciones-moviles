import React, { useState, useCallback } from 'react';
import type { Task, FilterType, TaskFormData } from './types/Task';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterButtons } from './components/FilterButtons';
import { useTaskFilter } from './hooks/useTaskFilter';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = useTaskFilter(tasks, filter);

  const handleAddTask = useCallback((taskData: TaskFormData): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, [setTasks]);

  const handleToggleTask = useCallback((id: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const handleDeleteTask = useCallback((id: string): void => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  }, [setTasks]);

  const handleFilterChange = useCallback((newFilter: FilterType): void => {
    setFilter(newFilter);
  }, []);

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1>Lista de Tareas</h1>
            </div>
          </div>
        </header>

        <div className="app-content">
          <section className="form-section">
            <h2 className="section-title">Nueva Tarea</h2>
            <TaskForm onAddTask={handleAddTask} />
          </section>

          <section className="tasks-section">
            <div className="tasks-header">
              <h2 className="section-title">Mis Tareas</h2>
              <FilterButtons
                currentFilter={filter}
                onFilterChange={handleFilterChange}
                taskCounts={taskCounts}
              />
            </div>
            <TaskList
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;