'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Button from '@/templates/Button';

export default function UploadAudio({ isOpen, onClose, onAudioUpload }) {
  const [audioFile, setAudioFile] = useState(null);
  const [audioInputName, setAudioInputName] = useState('');
  const [description, setDescription] = useState('');

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const handleSave = () => {
    if (audioFile && audioInputName) {
      onAudioUpload({
        nombre: audioInputName,
        audio: audioFile,
        description,
      });
      onClose(); // Cierra el modal
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Agregar Audio</h2>

        <div className="mb-4">
          <InputTemplate
            label="Nombre del Audio"
            value={audioInputName}
            onChange={(e) => setAudioInputName(e.target.value)}
            placeholder="Ingrese el nombre del audio"
          />
        </div>

        <div className="mb-4">
          <TextAreaTemplate
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese una descripción para el audio"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Archivo de Audio
          </h3>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="hidden"
            id="audio-upload"
          />
          <Button
            onClick={() => document.getElementById('audio-upload').click()}
            variant="secondary"
          >
            Elegir archivo
          </Button>
          {audioFile && (
            <p className="mt-2 text-sm text-gray-600">{audioFile.name}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave} variant="primary">
            Guardar
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
