'use client';

import React, { useState } from 'react';

// Función para obtener las palabras entre corchetes y el texto del ejercicio
const extractWords = (text) => {
  if (!text) return []; // Si el texto está vacío o indefinido, devolver un array vacío
  const parts = text.split(/(\[.*?\])/); // Dividir el texto por los corchetes
  const words = [];
  parts.forEach((part) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      words.push(part.slice(1, -1)); // Extraer la palabra sin corchetes
    }
  });
  return words;
};

export default function FillWordsList({ exerciseText, onSave, onClose }) {
  const [fillInWords, setFillInWords] = useState({});
  const [draggedWord, setDraggedWord] = useState(null);

  // Manejar el inicio del drag (arrastre)
  const handleDragStart = (word) => {
    setDraggedWord(word);
  };

  // Manejar el drop (soltar) en el lugar de la palabra
  const handleDrop = (e, index) => {
    e.preventDefault();
    const updatedWords = { ...fillInWords, [index]: draggedWord };
    setFillInWords(updatedWords);
  };

  // Prevenir el comportamiento por defecto (para permitir el drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Manejar el guardado
  const handleSave = () => {
    const updatedText = exerciseText.split(/(\[.*?\])/).map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return `[${fillInWords[index] || ''}]`; // Reemplazar con la palabra arrastrada
      }
      return part;
    }).join('');
    onSave(updatedText); // Guardar el ejercicio
    onClose();
  };

  // Validación previa a la extracción de palabras
  const words = extractWords(exerciseText || ''); // Asegurarse de que el texto no sea undefined
  const parts = exerciseText ? exerciseText.split(/(\[.*?\])/): []; // Si exerciseText está definido, lo dividimos

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fill Words Exercise</h2>

        {/* Vista previa */}
        <div className="mb-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Exercise Preview:</h3>
          <div className="text-gray-900">
            {parts.map((part, index) => {
              if (part.startsWith('[') && part.endsWith(']')) {
                // Si es una palabra entre corchetes, la mostramos como una caja de drop
                return (
                  <span
                    key={index}
                    className="inline-block border border-gray-300 p-1 m-1 rounded-md bg-gray-100 cursor-pointer"
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={handleDragOver}
                  >
                    {fillInWords[index] || '___'} {/* Mostrar la palabra arrastrada o espacio vacío */}
                  </span>
                );
              }
              return <span key={index}>{part}</span>; // Mostrar el texto normal
            })}
          </div>
        </div>

        {/* Palabras para arrastrar */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Drag and Drop Words:</h3>
          <div className="flex flex-wrap gap-2">
            {words.map((word, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
                draggable
                onDragStart={() => handleDragStart(word)} // Iniciar el drag
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FEAB5F] text-white rounded-md hover:bg-[#FE9B3F] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
