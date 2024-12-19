'use client'
import React from 'react';
import { Users, Globe2, Calendar, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ClassCreateCard({ class: classItem, className, onClick, onDelete }) {
  return (
    <div
      className={cn(
        "bg-gray-200 rounded-lg p-6 cursor-pointer shadow-xl hover:bg-gray-900 hover:text-white transition duration-300 relative", // Aseguramos que el card tenga `relative`
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-items-start">
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
          <h3 className="text-lg font-semibold mb-2">{classItem.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Level {classItem.level}
        </span>

        {/* Botón de eliminar en la esquina superior derecha */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el evento de clic en el botón también active el onClick del card
            onDelete(); // Llama la función onDelete
          }}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-300"
        >
          <Trash2 className="h-5 w-5" />
        </button>
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
