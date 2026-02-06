import { useMemo } from 'react';
import type { Task, FilterType } from '../types/Task';

export const useTaskFilter = (tasks: Task[], filter: FilterType): Task[] => {
  return useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, filter]);
};