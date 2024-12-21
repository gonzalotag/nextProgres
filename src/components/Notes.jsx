'use client'

import React, { useState } from 'react'
import { Circle } from 'lucide-react'

const Notes = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [selectedColor, setSelectedColor] = useState('blue')

  const colors = [
    { name: 'blue', bg: '#E3F2FD', text: '#1565C0' },
    { name: 'yellow', bg: '#FFF9C4', text: '#F9A825' },
    { name: 'green', bg: '#E8F5E9', text: '#2E7D32' },
    { name: 'red', bg: '#FFEBEE', text: '#C62828' },
    { name: 'gray', bg: '#F5F5F5', text: '#424242' }
  ]

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar la nota
    console.log('Guardando nota:', { title, message, color: selectedColor })
    // Puedes agregar aquí la lógica para enviar los datos a un servidor o guardarlos localmente
  }

  const handleCancel = () => {
    // Aquí puedes implementar la lógica para cancelar y limpiar el formulario
    setTitle('')
    setMessage('')
    setSelectedColor('blue')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa un título"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color:
          </label>
          <div className="flex space-x-4">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: color.bg }}
              >
                <Circle
                  size={20}
                  fill={color.text}
                  color={color.text}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje de texto:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Ingresa tu mensaje"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vista previa:
          </label>
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors.find(c => c.name === selectedColor)?.bg,
              color: colors.find(c => c.name === selectedColor)?.text
            }}
          >
            <h3 className="text-lg font-semibold mb-2">{title || 'Sin título'}</h3>
            <p className="whitespace-pre-wrap">{message || 'Sin mensaje'}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Guardar
          </button> 
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Notes

