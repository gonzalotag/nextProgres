'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ButtonTemplate } from '@/templates/ButtonTemplate';
import { CardTemplate } from '@/templates/CardTemplate';
import { SubtitleTemplate } from '@/templates/SubtittleTemplate';
import { ClassList } from '@/templates/ClassList';
import { languages } from '@/data/languages';

const mockClasses = [
  {
    id: '1',
    name: 'English for Beginners',
    description: 'Introduction to English language basics',
    students: 15,
    language: languages[0],
    level: 'A1',
    schedule: [
      { day: 'Monday', time: '10:00' },
      { day: 'Wednesday', time: '10:00' }
    ]
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: languages[1],
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' }
    ]
  },
];

export default function ClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState(mockClasses);

  useEffect(() => {
    const storedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    setClasses([...mockClasses, ...storedClasses]);
  }, []);

  const handleDelete = (id) => {
    setClasses((prev) => prev.filter((item) => item.id !== id));
    console.log(`Clase con id ${id} eliminada`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[80px]">
      <SubtitleTemplate
        icon={<ArrowRight className="text-black bg-[#FEAB5F] rounded-full" />}
        title="Clases"
      />

      <CardTemplate className="bg-white shadow-md p-6 max-w-4xl mx-auto">
        <ButtonTemplate
          href="/Admin"
          text="Regresar a la página de inicio"
          className="bg-gray-500 hover:bg-gray-700 text-white mb-4"
        />
        
        <div className="flex justify-center mb-4">
          <ButtonTemplate
            href="/CreateClass"
            text={
              <span className="flex items-center">
                <Plus className="mr-2" />
                Crear nueva clase
              </span>
            }
          />
        </div>

        <ClassList
          classes={classes}
          onNavigate={(path) => router.push(path)}
          onDelete={handleDelete}
        />
      </CardTemplate>
    </div>
  );
}