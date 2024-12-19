'use client';

import React, { useState, useEffect } from 'react';

// Función para parsear el texto del ejercicio y mostrar inputs en los lugares correspondientes
import { CheckCircle, XCircle } from 'lucide-react';

const parseExerciseText = (exerciseText, fillInWords, handleInputChange, errors) => {
  const parts = exerciseText.split(/(\[.*?\])/); // Dividir el texto por los corchetes
  return parts.map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const word = part.slice(1, -1); // Extraer palabra sin corchetes
      const isError = errors[index]; // Si hay error, marcamos
      return (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            className={`border-b border-gray-300 focus:border-[#FEAB5F] outline-none px-1 w-20 inline-block ${isError ? 'border-red-500' : ''}`}
            placeholder={`${word}`} // Agregar el atajo dentro del placeholder
            value={fillInWords[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {/* Usando iconos de Lucide */}
          {isError ? (
            <XCircle className="h-5 w-5 text-red-500" /> // Icono de error (X)
          ) : fillInWords[index] ? (
            <CheckCircle className="h-5 w-5 text-green-500" /> // Icono de éxito (Check)
          ) : null}
        </div>
      );
    }
    return <span key={index}>{part}</span>; // Mostrar el texto normal
  });
};


export default function FillInTheBlanksModal({ isOpen, onClose, onSave }) {
  const [task, setTask] = useState('');  // Título del ejercicio
  const [exerciseText, setExerciseText] = useState(''); // Texto del ejercicio
  const [fillInWords, setFillInWords] = useState({}); // Almacenar palabras a completar
  const [errors, setErrors] = useState({}); // Para gestionar los errores de las respuestas

  // Manejar cambios en los inputs de los campos de texto a completar
  const handleInputChange = (index, value) => {
    setFillInWords((prev) => ({ ...prev, [index]: value }));
  };

  // Verificar si las respuestas son correctas
  const validateAnswers = () => {
    const parts = exerciseText.split(/(\[.*?\])/);
    let newErrors = {};

    parts.forEach((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const word = part.slice(1, -1); // Palabra original entre corchetes
        if (fillInWords[index] && fillInWords[index].toLowerCase() !== word.toLowerCase()) {
          newErrors[index] = 'incorrect'; // Marcar como incorrecta
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, es correcto
  };

  // Guardar el ejercicio
  const handleSave = () => {
    const isValid = validateAnswers(); // Verificar las respuestas

    if (isValid && task && exerciseText) {
      const filledText = exerciseText.replace(/\[.*?\]/g, (_, idx) => {
        return `[${fillInWords[idx] || ''}]`; // Reemplazar el texto de los corchetes
      });

      onSave({ nombre: task, textoEjercicio: filledText });
      onClose();
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create new exercise</h2>

        {/* Campo para el título de la tarea */}
        <div className="mb-4">
          <label htmlFor="task" className="block text-lg font-medium text-gray-900 mb-1">
            Task
          </label>
          <input
            type="text"
            id="task"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task description"
          />
        </div>

        {/* Campo para el texto del ejercicio */}
        <div className="mb-4">
          <label htmlFor="exercise-text" className="block text-lg font-medium text-gray-900 mb-1">
            Text of exercise
            <br />
            Enter exercise text. Use [brackets] for words to be filled in.
          </label>
          <textarea
            id="exercise-text"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 h-32"
            value={exerciseText}
            onChange={(e) => setExerciseText(e.target.value)}
          />
        </div>

          {/* Vista previa del ejercicio */}
        <div className="mb-4 p-4 border border-gray-300 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Preview:</h3>
          {/* Mostrar el título y el texto con los campos de autocompletar */}
            {task && <h4 className="text-xl font-semibold text-gray-800 mb-2">{task}</h4>}

          <div className="text-gray-900 flex flex-wrap">
            {parseExerciseText(exerciseText, fillInWords, handleInputChange, errors)}
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
