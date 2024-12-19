'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import ImageProvider from '@/components/ImageProvider';
import UploadAudio from '@/components/UploadAudio';
import FillInTheBlanks from '@/components/FillInTheBlanks'
import CompleteText from '@/components/CompleteText';
import OrderColumn from '@/components/OrderColumn';
import OrderText from '@/components/OrderText';
import SelectQuestions from '@/components/SelectQuestions';
import WordsAndImage from '@/components/WordsAndImage.jsx';



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

  // Opciones para abrir modales específicos
  const openImageProvider = () => setModalContent('imageProvider');
  const openAudioProvider = () => setModalContent('audioProvider');
  const openFillInTheBlanks = () => setModalContent('fillInTheBlanks');
  const openDropdownParagraph = () => setModalContent('completeText');
  const openWordMatchGame = () => setModalContent('orderColumn');
  const openDraggableText = () => setModalContent('orderText');
  const openSingleSelectQuestion = () => setModalContent('selectQuestion');
  const openDraggableimage = () => setModalContent('wordsAndImage');


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
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
          >
            Add Exercise
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-[40%] max-h-[70vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Choose an Action</h2>
          
      {modalContent === '' && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-[100%] ">
          
          <div
              className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64 "
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openImageProvider}
            >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300">
              Cargar Imagen</h3>
          </div>
          <div
            className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openAudioProvider}
          >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 ">
              Cargar Audio
            </h3>
          </div>
          <div
            className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openFillInTheBlanks}
          >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300">
              Fill in the Blanks
              <br />
            </h3>
          </div>
          
          <div
            className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDropdownParagraph}
          >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300">
              Complete Text
            </h3>
          </div>
          <div
            className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openWordMatchGame}
          >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300">
              Order Column
            </h3>
          </div>
          <div
            className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64 "
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDraggableText}
          >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300">
              Order Text
            </h3>
          </div>
          <div
            className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openSingleSelectQuestion}
          >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300">
              Select Question
            </h3>
          </div>
          <div
            className="flex items-end cursor-pointer p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-64 h-64"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDraggableimage}
          >
            <h3 className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300">
              Word Image Match
            </h3>
          </div>
        </div>
      )}

            {/* Contenido dinámico del modal */}
            {modalContent === 'imageProvider' && (
              <ImageProvider closeModal={closeModal} onImageUpload={handleExerciseAdd} />
            )}
            {modalContent === 'audioProvider' && (
              <UploadAudio isOpen={true} onClose={closeModal} onAudioUpload={handleExerciseAdd} />
            )}
            {modalContent === 'fillInTheBlanks' && (
              <FillInTheBlanks isOpen={true} onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'completeText' && (
              <CompleteText onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'orderColumn' && (
              <OrderColumn onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'orderText' && (
              <OrderText onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'selectQuestions' && (
              <SelectQuestions onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'wordsAndImage' && (
              <WordsAndImage onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            

            {/* Botón para cerrar el modal */}
            <button
              onClick={closeModal}
              className="flex items-center px-4 py-2 mt-3 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
