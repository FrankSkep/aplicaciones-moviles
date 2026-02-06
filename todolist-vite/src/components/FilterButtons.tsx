import React from 'react';
import type { FilterType } from '../types/Task';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  currentFilter, 
  onFilterChange,
  taskCounts 
}) => {
  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: 'Todas', value: 'all', count: taskCounts.all },
    { label: 'Activas', value: 'active', count: taskCounts.active },
    { label: 'Completadas', value: 'completed', count: taskCounts.completed },
  ];

  return (
    <div className="filter-buttons">
      {filters.map(({ label, value, count }) => (
        <button
          key={value}
          className={`btn btn-filter ${currentFilter === value ? 'active' : ''}`}
          onClick={() => onFilterChange(value)}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};