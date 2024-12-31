'use client';

import React, { useState,useRef,useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { BookOpen } from 'lucide-react';
import ImageProvider from '@/components/ImageProvider';
import UploadAudio from '@/components/UploadAudio';
import FillInTheBlanks from '@/components/FillInTheBlanks'
import CompleteText from '@/components/CompleteText';
import OrderText from '@/components/OrderText';
import SingleSelectQuestion from '@/components/SelectQuestions';
import WordsAndImage from '@/components/WordsAndImage.jsx';
import { WordMatchGame } from '@/components/OrderColumn';
import DraggableWords from '@/components/FillWordList';
import DraggableLetters from '@/components/OrderWords';
import ExternalLinkCard from '@/components/ExternalLink';
import Notes from '@/components/Notes';

export default function AddExercise() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(''); 
  const [exercises, setExercises] = useState([]); 
  const [userAnswers, setUserAnswers] = useState({});
   
  const modalRef = useRef(null);

  useEffect(() => {
    const modalState = localStorage.getItem('isModalOpen');
    if (modalState === 'true') {
      setIsModalOpen(true);
    }
  }, []);
  
  const openModal = () => {
    setIsModalOpen(true);
    localStorage.setItem('isModalOpen', 'true');
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleExerciseAdd = (newExercise) => {
    setExercises((prevExercises) => [...prevExercises, newExercise]);
    closeModal();
  };

  
  const handleInputChange = (index, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const openImageProvider = () => setModalContent('imageProvider');
  const openAudioProvider = () => setModalContent('audioProvider');
  const openFillInTheBlanks = () => setModalContent('fillInTheBlanks');
  const openDropdownParagraph = () => setModalContent('completeText');
  const openWordMatchGame = () => setModalContent('orderColumn');
  const openDraggableText = () => setModalContent('orderText');
  const openSingleSelectQuestion = () => setModalContent('selectQuestion');
  const openDraggableimage = () => setModalContent('wordsAndImage');
  const openDraggableWords = () => setModalContent('fillWordsList');
  const openDraggableLetters = () => setModalContent('orderWords');
  const openExternalLinkCard = () => {
    console.log('Abriendo enlace externo');
    setModalContent('externalLink');
    openModal();
  };

  const openNotes = () => setModalContent('notes');
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white rounded py-2 px-4 transition-colors duration-300 hover:text-black mt-4"
          onClick={() => router.push('/Admin')}
        >
          Regresar a la página de inicio
        </button>

        </div>
        <div>
          <h1 className="text-3xl font-bold py-2 mb-6">Lista de Ejercicios</h1>

          {exercises.length === 0 && (
            <div className="flex flex-col items-center">
              <BookOpen className="h-16 w-16 text-gray-400" />
              <p className="mt-4 text-center text-gray-600">
                No tienes ejercicios en esta seccion, desea agregar ejercicios.
              </p>
            </div>
          )}

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
                  
                  {exercise.nombre && (
                    <h3 className="text-xl font-semibold text-gray-800">{exercise.nombre}</h3>
                  )}

                  {exercise.description && (
                    <p className="mt-2 text-sm text-gray-600">{exercise.description}</p>
                  )}
                  
                    <audio controls className="w-full mt-2">
                    <source src={URL.createObjectURL(exercise.audio)} type="audio/mpeg" />
                    tu buscador no soporta este elemento.
                    </audio>
                  </div>
                  )}
                  
                  {exercise.nombre && (
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{exercise.nombre}</h3> 
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
                      value={userAnswers[idx] || ''} 
                      onChange={(e) => handleInputChange(idx, e.target.value)}
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

        <div className="flex justify-center mt-6">
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
          >
            Agregar Ejercicio
          </button>
        </div>
      </div>

      {isModalOpen && (
        
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-[95%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%] max-h-[70vh] overflow-y-auto"
            ref={modalRef}
          >
            <h2 className="text-2xl font-bold mb-4">Escoje una accion</h2>
      {modalContent === '' && (
        <div className="grid grid-cols-2 gap-4 w-full ">
          
          <div
          className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
          style={{ backgroundImage: "url('/books.png')" }}
          onClick={openImageProvider}
        >
          <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
            Cargar Imagen
          </h3>
        </div>

          <div
              className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
              style={{ backgroundImage: "url('/books.png')" }}
              onClick={openAudioProvider}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
                Cargar Audio
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openFillInTheBlanks}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Rellenar espacion en blanco
              <br />
            </h3>
          </div>

          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDropdownParagraph}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Seleccionar Para Completar
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openWordMatchGame}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Emparejar Columnas
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDraggableText}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Organizar palabras
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openSingleSelectQuestion}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Ordenar Oraciones
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDraggableimage}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Emparejar texto con Imagen
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDraggableWords}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Rellenar con lista de palabras
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square min-h-[150px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openDraggableLetters}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Organizar Palabras desde Letras
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openExternalLinkCard}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Crear Tarjeta de Enlace Externo
            </h3>
          </div>
          <div
            className="flex flex-col justify-end items-end p-4 border rounded-lg hover:shadow-lg bg-cover bg-center w-full aspect-square bg-no-repeat"
            style={{ backgroundImage: "url('/books.png')" }}
            onClick={openNotes}
          >
            <h3 className="text-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300 w-full">
              Crear Nota
            </h3>
          </div>
        </div>
      )}

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
              <WordMatchGame onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'orderText' && (
              <OrderText onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'selectQuestion' && (
              <SingleSelectQuestion onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'wordsAndImage' && (
              <WordsAndImage onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'fillWordsList' && (
              <DraggableWords onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'orderWords' && (
              <DraggableLetters onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            {modalContent === 'externalLink' && (
              <>
                <ExternalLinkCard onClose={closeModal} onSave={handleExerciseAdd} />
              </>
            )}
            {modalContent === 'notes' && (
              <Notes onClose={closeModal} onSave={handleExerciseAdd} />
            )}
            
            <button
              onClick={closeModal}
              className="flex items-center px-4 py-2 mt-3 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
