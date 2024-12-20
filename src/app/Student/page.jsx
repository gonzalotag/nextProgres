'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { Trash } from 'lucide-react';
import FormularioRegistroEstudiante from '@/components/FormularioResgitroEstudiante';
import PerfilEstudiante from '@/components/StudentPerfil';

export default function VistaEstudiante() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null); // Para manejar la vista persistente del perfil

  // Cargar estudiantes del almacenamiento local al inicio
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

  // Guardar estudiantes en el almacenamiento local cuando cambian
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Guardar el ID del estudiante activo en el almacenamiento local
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
    router.push(`/Student/${studentId}`); // Redirige a la ruta dinámica
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);

    // Si se elimina el estudiante activo, limpiar el ID
    if (students[index]?.id === activeStudentId) {
      setActiveStudentId(null);
    }
  };

  // Renderizar la vista de perfil si hay un estudiante activo
  if (activeStudentId) {
    const activeStudent = students.find(student => student.id === activeStudentId);
    if (activeStudent) {
      return (
        <PerfilEstudiante
          studentId={activeStudent.id}
          studentData={activeStudent}
          onBack={() => setActiveStudentId(null)} // Permitir regresar a la lista de estudiantes
        />
      );
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl text-center mb-8 text-gray-900">Student</h1>
        
        <div className="flex flex-col items-center mb-4">
          <button
            className="w-full p-2 bg-[#FEAB5F] text-black rounded-md transition-colors duration-500 hover:bg-gray-700 hover:text-white"
            onClick={() => setShowModal(true)}
          >
            <p>+ Create New Student</p>
          </button>
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
              <li key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-sm transition-shadow duration-300 cursor-pointer border border-gray-200 hover:border-[#FEAB5F] mb-2 flex justify-between items-center">
                <div className="flex items-center">
                  {student.imagen && <img src={student.imagen} alt="Perfil" className="w-16 h-16 object-cover rounded-full mr-4" />}
                  <div>
                    <h3 className="text-lg text-gray-900">{student.nombre}</h3>
                    <p className="text-gray-600">{student.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-[#FEAB5F] text-black rounded py-1 px-3 transition-colors duration-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => handleStudentProfileClick(student.id)}
                  >
                    Perfil Estudiante
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white rounded py-1 px-3 transition-colors duration-300 hover:text-black"
                    onClick={() => handleDeleteStudent(index)}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white rounded py-2 px-4 transition-colors duration-300 hover:text-black mt-4"
          onClick={() => router.push('/Admin')}
        >
          Regresar a la página de inicio
        </button>
      </div>
    </div>
  );
}
