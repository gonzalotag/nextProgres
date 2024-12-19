'use client';

import React, { useState, useContext } from 'react';
import { ImageContext } from '@/contexts/ImageContext';

export default function ImageProvider({ closeModal, onImageUpload }) { // Asegúrate de incluir onImageUpload como prop
  const { addImage } = useContext(ImageContext);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = () => {
    if (image && title) {
      const newImage = {
        imgURL: image,
        tituloPlantilla: title,
        description: description || 'Sin descripción',
      };
      addImage(newImage); // Si estás usando el contexto
      onImageUpload(newImage); // Pasamos el ejercicio al componente padre
      closeModal();
    } else {
      alert('Por favor, ingrese un título y seleccione una imagen.');
    }
  };

  const handleCancel = () => {
    setImage(null);
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>

      {/* Título */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter image title"
        />
      </div>

      {/* Selector de imagen */}
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition duration-300"
      >
        <span>Subir Imagen</span>
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Imagen seleccionada */}
      {image && (
        <div className="mt-4">
          <img src={image} alt="Selected" className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}

      {/* Descripción */}
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

      {/* Botones */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleCancel}
          className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveImage}
          className="flex items-center px-4 py-2 bg-[#FEAB5F] text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition duration-300"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
