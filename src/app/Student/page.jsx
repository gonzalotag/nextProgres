'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';
import FormularioRegistroEstudiante from '@/components/FormularioResgitroEstudiante';
import PerfilEstudiante from '@/components/StudentPerfil';
import Button from '@/templates/Button';
import { CardTemplate } from '@/templates/CardTemplate';

export default function VistaEstudiante() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);

  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }

    const savedActiveStudentId = localStorage.getItem('activeStudentId');
    if (savedActiveStudentId) {
      setActiveStudentId(savedActiveStudentId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (activeStudentId) {
      localStorage.setItem('activeStudentId', activeStudentId);
    } else {
      localStorage.removeItem('activeStudentId');
    }
  }, [activeStudentId]);

  const handleCreateStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStudentProfileClick = (studentId) => {
    router.push(`/Student/${studentId}`);
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);

    if (students[index]?.id === activeStudentId) {
      setActiveStudentId(null);
    }
  };

  if (activeStudentId) {
    const activeStudent = students.find(student => student.id === activeStudentId);
    if (activeStudent) {
      return (
        <PerfilEstudiante
          studentId={activeStudent.id}
          studentData={activeStudent}
          onBack={() => setActiveStudentId(null)}
        />
      );
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl text-center mb-8 text-gray-900">Student</h1>

        <div className="flex flex-col items-center mb-4">
          <Button
            onClick={() => setShowModal(true)}
            variant="primary"
            className="w-full"
          >
            + Create New Student
          </Button>
        </div>

        {showModal && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
            <FormularioRegistroEstudiante onCreate={handleCreateStudent} onClose={handleCloseModal} />
          </div>
        )}

        <div className="flex flex-col items-center mb-4 w-full">
          <h2 className="text-lg text-gray-900 mb-2">Estudiantes registrados</h2>
          <ul className="list-none p-0 m-0 w-full">
            {students.map((student, index) => (
              <CardTemplate
                key={index}
                className="hover:shadow-sm transition-shadow duration-300 cursor-pointer hover:border-[#FEAB5F] mb-2 flex justify-between items-center"
              >
                <div className="flex items-center">
                  {student.imagen && (
                    <img
                      src={student.imagen}
                      alt="Perfil"
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg text-gray-900">{student.nombre}</h3>
                    <p className="text-gray-600">{student.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleStudentProfileClick(student.id)}
                    variant="primary"
                  >
                    Perfil Estudiante
                  </Button>
                  <Button
                    onClick={() => handleDeleteStudent(index)}
                    variant="secondary"
                  >
                    <Trash size={18} />
                  </Button>
                </div>
              </CardTemplate>
            ))}
          </ul>
        </div>

        <Button
          onClick={() => router.push('/Admin')}
          variant="secondary"
          className="mt-4"
        >
          Regresar a la página de inicio
        </Button>
      </div>
    </div>
  );
}
