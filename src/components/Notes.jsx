'use client';

import React, { useState } from 'react';
import { Circle } from 'lucide-react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  const colors = [
    { name: 'blue', bg: '#E3F2FD', text: '#1565C0' },
    { name: 'yellow', bg: '#FFF9C4', text: '#F9A825' },
    { name: 'green', bg: '#E8F5E9', text: '#2E7D32' },
    { name: 'red', bg: '#FFEBEE', text: '#C62828' },
    { name: 'gray', bg: '#F5F5F5', text: '#424242' }
  ];

  const handleSave = () => {
    // Lógica para guardar la nota
    console.log('Guardando nota:', { title, message, color: selectedColor });
  };

  const handleCancel = () => {
    // Lógica para cancelar y limpiar el formulario
    setTitle('');
    setMessage('');
    setSelectedColor('blue');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        {/* Título */}
        <div>
          <Label htmlFor="title">Título:</Label>
          <InputTemplate
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingresa un título"
          />
        </div>

        {/* Selección de color */}
        <div>
          <Label htmlFor="color">Color:</Label>
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
                <Circle size={20} fill={color.text} color={color.text} />
              </button>
            ))}
          </div>
        </div>

        {/* Mensaje de texto */}
        <div>
          <Label htmlFor="message">Mensaje de texto:</Label>
          <TextAreaTemplate
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ingresa tu mensaje"
          />
        </div>

        {/* Vista previa */}
        <div>
          <Label>Vista previa:</Label>
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors.find((c) => c.name === selectedColor)?.bg,
              color: colors.find((c) => c.name === selectedColor)?.text
            }}
          >
            <h3 className="text-lg font-semibold mb-2">{title || 'Sin título'}</h3>
            <p className="whitespace-pre-wrap">{message || 'Sin mensaje'}</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave} variant="primary">
            Guardar
          </Button>
          <Button onClick={handleCancel} variant="secondary">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
