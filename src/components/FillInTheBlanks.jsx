'use client'

import React, { useState, useEffect } from 'react'

export default function FillInTheBlanksModal({ isOpen, onClose, onSave }) {
  const [task, setTask] = useState('')
  const [exerciseText, setExerciseText] = useState('')
  const [parsedExercise, setParsedExercise] = useState([])

  useEffect(() => {
    const parts = exerciseText.split(/(\[.*?\])/)
    setParsedExercise(
      parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <input
              key={index}
              type="text"
              className="border-b border-gray-300 focus:border-[#FEAB5F] outline-none px-1 w-20 inline-block"
              placeholder="Completar"
            />
          )
        }
        return <span key={index}>{part}</span>
      })
    )
  }, [exerciseText])

  const handleSave = () => {
    if (task && exerciseText) {
      onSave({ nombre: task, textoEjercicio: exerciseText })
      onClose()
    } else {
      alert('Por favor, completa todos los campos.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create new exercise</h2>

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

        <div className="mb-4">
          <label htmlFor="exercise-text" className="block text-lg font-medium text-gray-900 mb-1">
            Text of exercise
          </label>
          <textarea
            id="exercise-text"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 h-32"
            value={exerciseText}
            onChange={(e) => setExerciseText(e.target.value)}
            placeholder="Enter exercise text. Use [brackets] for words to be filled in."
          />
        </div>

        <div className="mb-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Preview:</h3>
          <div className="text-gray-900">{parsedExercise}</div>
        </div>

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
  )
}
