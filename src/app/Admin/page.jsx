'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClassCard } from '@/components/ClassCard';
import { ButtonTemplate } from '@/templates/ButtonTemplate'; 
import { SubtitleTemplate } from '@/templates/SubtittleTemplate';
import { Users, Star, ArrowRight } from 'lucide-react';

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
];

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userEmail');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const ButtonSection = ({ label, path, icon }) => (
    <ButtonTemplate href={path} text={<><span className="mr-2">{icon}</span><span>{label}</span></>}/>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[80px]">
      <div className="space-y-8">
        <section>
          <SubtitleTemplate icon={<ArrowRight className="relative text-black font-semibold bg-[#FEAB5F] rounded-full" />} title="Web site" />
          <div className="flex justify-around items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <ButtonSection label="Teachers" path="/teachers" icon={<Users className="h-5 w-5" />} />
            <ButtonSection label="Estudiante" path="/Student" icon={<Users className="h-5 w-5" />} />
            <ButtonSection label="Reseñas" path="/reviews" icon={<Star className="h-5 w-5" />} />
            <ButtonSection label="Contactos" path="/reviews" icon={<Star className="h-5 w-5" />} />
            <ButtonSection label="Sobre Nosotros" path="/reviews" icon={<Users className="h-5 w-5" />} />
          </div>
        </section>

        <section>
          <SubtitleTemplate icon={<ArrowRight className="relative text-black font-semibold bg-[#FEAB5F] rounded-full" />} title="Students" />
          <button className="bg-white shadow-md rounded-lg p-6" onClick={() => handleNavigation('/Student')}>
            <span className="text-sm">Total Estudiantes</span>
            <Users className="h-5 w-5 mr-2" />
          </button>
        </section>

        <section>
          <SubtitleTemplate icon={<ArrowRight className="relative text-black font-semibold bg-[#FEAB5F] rounded-full" />} title="Clases" />
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="flex space-x-4">
              {mockClasses.map((classItem) => (
                <li key={classItem.id}>
                  <ClassCard class={classItem} onClick={() => handleNavigation(`/AddExercice/${classItem.id}`)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}