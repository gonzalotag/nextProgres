'use client';
import React from 'react';
import { Users, Globe2, Calendar, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardTemplate } from '@/templates/CardTemplate';
import Label from '@/templates/Labels';

export function ClassCreateCard({ class: classItem, className, onClick, onDelete }) {
  return (
    <CardTemplate
      className={cn(
        "bg-gray-200 rounded-lg cursor-pointer shadow-xl hover:bg-gray-900 hover:text-white transition duration-300 relative",
        className
      )}
    >
      <div className="flex items-start justify-items-start" onClick={onClick}>
        {classItem.image && (
          <img
            src={classItem.image}
            alt={`${classItem.name} thumbnail`}
            className="w-16 h-16 rounded-md object-cover mr-4"
          />
        )}

        <div>
          <Label className="text-lg font-semibold mb-2 text-black">{classItem.name}</Label>
          <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Level {classItem.level}
        </span>

        <DeleteButton onDelete={onDelete} />
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <InfoItem icon={Globe2} text={classItem.language?.name || 'No language specified'} />
        <InfoItem icon={Users} text={`${classItem.students} students`} />
        <InfoItem icon={Calendar} text={`${classItem.schedule?.length || 0} sessions/week`} />
      </div>
    </CardTemplate>
  );
}

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center">
    <Icon className="h-4 w-4 mr-1" />
    <span>{text}</span>
  </div>
);

const DeleteButton = ({ onDelete }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onDelete();
    }}
    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-300"
  >
    <Trash2 className="h-5 w-5" />
  </button>
);
