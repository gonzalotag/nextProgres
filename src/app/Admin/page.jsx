'use client';

import React, { useState, useEffect } from 'react';
import { Users, Star, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ClassCard } from '@/components/ClassCard';

const mockClasses = [
  {
    id: '1',
    name: 'English for Beginners',
    description: 'Introduction to English language basics',
    students: 15,
    language: { name: 'English' },
    level: 'A1',
    schedule: [
      { day: 'Monday', time: '10:00' },
      { day: 'Wednesday', time: '10:00' },
    ],
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: { name: 'Spanish' },
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' },
    ],
  },
  {
    id: '3',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: { name: 'Spanish' },
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' },
    ],
  },
];

function Subtitle({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center my-4 px-5 py-3 bg-[#FEAB5F] rounded-b-xl rounded-tl-xl hover:bg-gray-900 hover:text-white transition duration-300"
    >
      {icon}
      <h2 className="text-xl font-semibold text-black ml-5">{title}</h2>
    </button>
  );
}

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userEmail');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const handleNavigation = (path) => {
    console.log('Navigating to: ', path);
    router.push(path);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[80px]">
      <div className="space-y-8">
        <section>
          <Subtitle
            icon={<ArrowRight className="relative text-black font-semibold bg-[#FEAB5F] rounded-full" />}
            title="Web site"
          />
          <div className="flex justify-around items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <button
              className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
              onClick={() => handleNavigation('/teachers')}
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm">Teachers</span>
            </button>
            <button
              className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
              onClick={() => handleNavigation('/Student')}
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm">Estudiante</span>
            </button>
            <button
              className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
              onClick={() => handleNavigation('/reviews')}
            >
              <Star className="h-5 w-5 mr-2" />
              <span className="text-sm">Reseñas</span>
            </button>
            <button
              className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
              onClick={() => handleNavigation('/reviews')}
            >
              <Star className="h-5 w-5 mr-2" />
              <span className="text-sm">Contactos</span>
            </button>

            <button
              className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
              onClick={() => handleNavigation('/reviews')}
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm">Sobre Nosotros</span>
            </button>
          </div>
        </section>

        
        <section>
        <Subtitle
            icon={<ArrowRight className="relative text-black font-semibold bg-[#FEAB5F] rounded-full" />}
            title="Students"
            onClick={() => handleNavigation('/Student')}
        />
          <button
              className="bg-white shadow-md rounded-lg p-6"
              onClick={() => handleNavigation('/Student')}
            >
              <span className="text-sm">Total Students</span>
              <Users className="h-5 w-5 mr-2" />
            </button>
        </section>

        <section>
          <Subtitle
            icon={<ArrowRight className="relative text-black font-semibold bg-[#FEAB5F] rounded-full" />}
            title="Clases"
            onClick={() => handleNavigation('/Classes')}
          />
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="flex space-x-4">
              {mockClasses.map((classItem) => (
                <li key={classItem.id}>
                  <ClassCard
                    key={classItem.id}
                    class={classItem}
                    onClick={() => handleNavigation(`/AddExercice/${classItem.id}`)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
