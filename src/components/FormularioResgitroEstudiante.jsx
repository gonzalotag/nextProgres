'use client';
import React, { useState } from 'react';

export default function FormularioRegistroEstudiante({ onCreate }) {
  const [isOpen, setIsOpen] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [lengua, setLengua] = useState('ingles');

  const handleCreate = () => {
    const newStudent = {
      email,
      telefono,
      nombre,
      lengua,
      imagen,
    };
    console.log("Crear estudiante", newStudent);
    onCreate(newStudent); // Llamar a la función para agregar el estudiante
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleImageUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo)); // Crear una URL para la imagen seleccionada
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
        <h2 className="text-lg text-gray-900 mb-2">Create Student</h2>
        <form>
          <div className="mb-4">
            <label className="text-gray-900">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-input"
            />
            <button
              type="button"
              onClick={() => document.getElementById('file-input').click()}
              className="bg-[#FEAB5F] text-white py-2 px-4 rounded transition duration-200"
            >
              Upload Photo
            </button>
            {imagen && <img src={imagen} alt="Perfil" className="mt-2 w-16 h-16 object-cover rounded-full" />}
          </div>
          <div className="mb-4">
            <label className="text-gray-900">Mail:</label>
            <input
              type="email"
              placeholder="Ingrese correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-900">Telephone:</label>
            <input
              type="text"
              placeholder="Ingrese número de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-900">Name:</label>
            <input
              type="text"
              placeholder="Ingrese nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-900">Native Language:</label>
            <select
              value={lengua}
              onChange={(e) => setLengua(e.target.value)}
              className="w-full p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-[#FEAB 5F] focus:border-[#FEAB5F]"
            >
              <option value="ingles">Inglés</option>
              <option value="frances">Francés</option>
              <option value="ruso">Ruso</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-black hover:bg-[#FEAB5F] hover:text-white py-2 px-4 rounded mr-2 transition duration-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-[#FEAB5F] text-black hover:bg-gray-500 hover:text-white py-2 px-4 rounded transition duration-200"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}