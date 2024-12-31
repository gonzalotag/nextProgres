import React from 'react';
import { ClassCreateCard } from '@/components/ClassCreateCard';

export const ClassList = ({ classes, onNavigate, onDelete }) => (
  <ul className="space-y-4">
    {classes.map((classItem) => (
      <li key={classItem.id}>
        <ClassCreateCard
          class={classItem}
          onClick={() => onNavigate(`/AddExercice/${classItem.id}`)}
          onDelete={onDelete}
        />
      </li>
    ))}
  </ul>
);