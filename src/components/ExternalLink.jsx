'use client'

import { useState } from "react";

const ExternalLinkCard = ({ onSave, onCancel }) => {
  const [cardData, setCardData] = useState({
    title: '',
    description: '',
    url: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(cardData);
  };

  const handleCancel = () => {
    setCardData({
      title: '',
      description: '',
      url: '',
    });

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="font-sans max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Crear Tarjeta de Enlace Externo</h2>
      {/* Formulario */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Título:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="title"
          value={cardData.title}
          onChange={handleInputChange}
          placeholder="Ingrese el título"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descripción:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={cardData.description}
          onChange={handleInputChange}
          placeholder="Ingrese la descripción"
          rows="3"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
          URL Externa:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="url"
          type="url"
          name="url"
          value={cardData.url}
          onChange={handleInputChange}
          placeholder="https://ejemplo.com"
        />
      </div>
      <button
        onClick={handleSave}
        className="w-full bg-[#FEAB5F] text-white rounded py-2 px-4 mt-4 hover:bg-gray-900 hover:text-white transition duration-300"
      >
        Guardar
      </button>
      <button
        onClick={handleCancel}
        className="w-full bg-gray-300 text-gray-700 rounded py-2 px-4 mt-4 hover:bg-gray-900 hover:text-white transition duration-300"
      >
        Cancelar
      </button>
    </div>
  );
};

export default ExternalLinkCard;
