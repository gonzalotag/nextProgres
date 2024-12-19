import React, { useState } from 'react';

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
      // Aquí usamos la función pasada como prop
      onAudioUpload({
        nombre: audioInputName,
        audio: audioFile,
        description: description,  // Aquí agregamos la descripción
      });
      onClose(); // Cerrar el modal
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-100 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Agregar Audio</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Audio</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={audioInputName}
            onChange={(e) => setAudioInputName(e.target.value)}
            placeholder="Ingrese el nombre del audio"
          />
        </div>

        <div className="mb-4 mt-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter image description"
        />
      </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Archivo de Audio</h3>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="hidden"
            id="audio-upload"
          />
          <button
            onClick={() => document.getElementById('audio-upload').click()}
            className="px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-[#FE9B3F] transition-colors"
          >
            Elegir archivo
          </button>
          {audioFile && <p className="mt-2 text-sm text-gray-600">{audioFile.name}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-[#FE9B3F] transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
