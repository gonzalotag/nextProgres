'use client'

import React, { useState, useEffect } from 'react'

const ExerciseCreator = () => {
  const [title, setTitle] = useState('')
  const [exerciseText, setExerciseText] = useState('')
  const [processedText, setProcessedText] = useState([])

  useEffect(() => {
    processExerciseText()
  }, [exerciseText])

  const processExerciseText = () => {
    const parts = exerciseText.split(/\[|\]/)
    const processed = parts.map((part, index) => {
      if (index % 2 === 1) {
        // This part was inside brackets
        const options = part.split('/')
        return (
          <select
            key={index}
            className="inline-block px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      } else {
        return part
      }
    })
    setProcessedText(processed)
  }

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving exercise:', { title, exerciseText })
  }

  const handleCancel = () => {
    // Implement cancel functionality here
    setTitle('')
    setExerciseText('')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Creador de Ejercicios</h1>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese el título del ejercicio"
        />
      </div>

      <div className="mb-4 p-3 bg-yellow-100 rounded-md">
        <p className="text-sm font-bold">
          Las palabras entre [ ] se pasarán a selección. Si quiere agregar más palabras, use "/" y agregue más.
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="exerciseText" className="block text-sm font-medium text-gray-700 mb-1">
          Texto del ejercicio:
        </label>
        <textarea
          id="exerciseText"
          value={exerciseText}
          onChange={(e) => setExerciseText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={5}
          placeholder="Ingrese el texto del ejercicio. Use [palabra1/palabra2] para crear selecciones."
        />
      </div>

      <div className="mb-4 p-3 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Vista previa del ejercicio:</h2>
        <div>{processedText}</div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar
        </button>
      </div>
    </div>
  )
}

export default ExerciseCreator

