'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import TemplateStore from '@/components/TemplateStore';
import Link from 'next/link';


export default function AddExercise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(''); // Contenido dinámico del modal
  const [exercises, setExercises] = useState([]); // Lista de 
  const [userAnswers, setUserAnswers] = useState({});

  // Abrir el modal
  const openModal = () => setIsModalOpen(true);

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  // Agregar ejercicio a la lista
  const handleExerciseAdd = (newExercise) => {
    setExercises((prevExercises) => [...prevExercises, newExercise]);
    closeModal(); // Cierra el modal después de guardar
  };

  // Manejar cambios en los inputs
  const handleInputChange = (index, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // // Opciones para abrir modales específicos
  // const openImageProvider = () => setModalContent('imageProvider');
  // const openAudioProvider = () => setModalContent('audioProvider');
  // const openFillInTheBlanks = () => setModalContent('fillInTheBlanks');
  // const openDropdownParagraph = () => setModalContent('completeText');
  // const openWordMatchGame = () => setModalContent('orderColumn');
  // const openDraggableText = () => setModalContent('orderText');
  // const openSingleSelectQuestion = () => setModalContent('selectQuestion');
  // const openDraggableimage = () => setModalContent('wordsAndImage');









  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold mb-6">Exercise List</h1>

          {/* Mostrar mensaje si no hay ejercicios */}
          {exercises.length === 0 && (
            <div className="flex flex-col items-center">
              <BookOpen className="h-16 w-16 text-gray-400" />
              <p className="mt-4 text-center text-gray-600">
                There are no exercises in this section yet. Add an exercise.
              </p>
            </div>
          )}

          {/* Mostrar ejercicios agregados */}
          {exercises.length > 0 && (
            <div className="grid grid-cols-1  gap-4 mt-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md">
                  {exercise.imgURL && (
                    <div>
                      <img
                        src={exercise.imgURL}
                        alt={exercise.tituloPlantilla}
                        className="w-full h-80 object-cover rounded-md"
                      />
                      {exercise.tituloPlantilla && (
                        <h3 className="mt-2 text-xl font-semibold text-gray-800">{exercise.tituloPlantilla}</h3>
                      )}
                      {exercise.description && (
                        <p className="mt-2 text-sm text-gray-600">{exercise.description}</p>
                      )}
                    </div>
                  )}

                  {exercise.audio && (
                    <div className="p-4 border rounded-lg shadow-md">
                      {/* Mostrar el título del audio */}
                      {exercise.nombre && (
                        <h3 className="text-xl font-semibold text-gray-800">{exercise.nombre}</h3>
                      )}

                      {/* Mostrar la descripción del audio */}
                      {exercise.description && (
                        <p className="mt-2 text-sm text-gray-600">{exercise.description}</p>
                      )}

                      {/* Mostrar el reproductor de audio */}
                      <audio controls className="w-full mt-2">
                        <source src={URL.createObjectURL(exercise.audio)} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {exercise.nombre && (
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{exercise.nombre}</h3> // Mostrar el título
                  )}

                  {exercise.textoEjercicio &&
                    exercise.textoEjercicio.split(/(\[.*?\])/).map((part, idx) => {
                      if (part.startsWith('[') && part.endsWith(']')) {
                        return (
                          <input
                            key={idx}
                            type="text"
                            className="border-b border-gray-300 focus:border-[#FEAB5F] outline-none px-1 w-20 inline-block"
                            placeholder="Completar"
                            value={userAnswers[idx] || ''} // Vinculado al estado
                            onChange={(e) => handleInputChange(idx, e.target.value)} // Actualiza el estado
                          />
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })}

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón para abrir el modal */}
        <div className="flex justify-center mt-6">
          <Link href={`?modal=template`}>
            <button
              className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
            >
              Add Exercise
            </button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      <TemplateStore />
    </div>
  );
}
