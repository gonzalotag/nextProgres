'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ClassCreateCard } from '@/components/ClassCreateCard';

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

function Subtitle({ title, icon }) {
  return (
    <div className="flex my-4 items-center">
      {icon}
      <h2 className="text-xl font-semibold text-black px-5 bg-[#FEAB5F] ml-5 rounded-b-xl rounded-tl-xl">
        {title}
      </h2>
    </div>
  );
}

export default function ClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState(mockClasses);

  useEffect(() => {
    // Obtener clases guardadas en localStorage
    const storedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    // Combinar clases existentes con las clases almacenadas
    setClasses([...mockClasses, ...storedClasses]);
  }, []);

  const handleNavigation = (path) => {
    router.push(path); // Redirige a la página especificada
  };

  const handleDelete = (id) => {
    setClasses((prevClasses) => prevClasses.filter((classItem) => classItem.id !== id));
    console.log(`Clase con id ${id} eliminada`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[80px]">
      <section>
        {/* Subtitle */}
        <Subtitle
          icon={<ArrowRight className="text-black bg-[#FEAB5F] rounded-full" />}
          title="Clases"
        />

        {/* Card for classes */}

        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white rounded py-2 px-4 transition-colors duration-300 hover:text-black mt-4"
          onClick={() => router.push('/Admin')}
        >
          Regresar a la página de inicio
        </button>
          {/* Button to create new class */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => handleNavigation('/CreateClass')} // Ruta para crear nueva clase
              className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
            >
              <Plus className="mr-2" />
              Crear nueva clase
            </button>
          </div>

          {/* List of classes */}
          <ul className="space-y-4">
            {classes.map((classItem) => (
              <li key={classItem.id}>
                <ClassCreateCard
                  class={classItem}
                  onClick={() => handleNavigation(`/AddExercice/${classItem.id}`)} // Redirige a la página de detalles de la clase
                  onDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
