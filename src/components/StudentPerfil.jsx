
'use client'
import React, { useState } from 'react';

export default function PerfilEstudiante({studentId,onBack}) {
  const [imagen, setImagen] = useState(null);

  const handleAgregarFoto = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo)); // Crear una URL para la imagen seleccionada
    }
  };

  const handleEditar = () => {
    console.log(`Editar perfil del estudiante con ID: ${id}`);
  };

  const handleAgregarClase = () => {
    console.log(`Agregar clase al estudiante con ID: ${id}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-4 rounded-lg shadow-md w-1/2 h-5/6">
        <div className="flex justify-between mb-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded transition duration-300 flex items-center"
            onClick={onBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 19l-7-7m0 0l7-7" />
            </svg>
            Regresar a Vista Estudiante
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-full flex justify-between">
            <div className="w-1/3 flex flex-col items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4">
                {imagen && <img src={imagen} alt="Perfil" className="w-full h-full object-cover rounded-xl" />}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAgregarFoto}
                className="hidden"
                id="file-input"
              />
              <button
                className="bg-[#FEAB5F] hover:bg-gray-700 text-black font-bold py-1 px-2 rounded transition duration-300"
                onClick={() => document.getElementById('file-input').click()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="w-2/3 pl-4">
              <h2 className="text-lg font-bold text-gray-900">Estudiante ID: {studentId}</h2>
              <button
                className="bg-[#FEAB5F] hover:bg-gray-700 text-black font-bold py-1 px-2 rounded transition duration-300"
                onClick={handleEditar}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#FEAB5F] hover:bg-gray-700 text-black font-bold py-2 px-4 rounded transition duration-300"
            onClick={handleAgregarClase}
          >
            Agregar Clase
          </button>
        </div>
      </div>
    </div>
  );
}
