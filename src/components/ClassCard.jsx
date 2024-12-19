import React from 'react';
import { Users, Globe2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ClassCard({ class: classItem, className, onClick }) {
  return (
    <div 
      className={cn(
        "bg-gray-200 rounded-lg  p-6 hover:shadow-md transition-shadow cursor-pointer shadow-xl",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="mr-4">
          {classItem.image && (
            <img
              src={classItem.image}
              alt={`${classItem.name} thumbnail`}
              className="w-16 h-16 rounded-md object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">{classItem.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Level {classItem.level}
        </span>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Globe2 className="h-4 w-4 mr-1" />
          <span>{classItem.language?.name || 'No language specified'}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{classItem.students} students</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{classItem.schedule?.length || 0} sessions/week</span>
        </div>
      </div>
    </div>
  );
}
