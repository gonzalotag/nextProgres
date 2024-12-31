'use client';
import React, { useState } from 'react';
import Button from '@/templates/Button';
import { InputTemplate } from '@/templates/InputTemplate';
import Label from '@/templates/Labels';

const ModalTemplate = ({ isOpen, children, onClose, className }) => (
  <div
    className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'} ${className}`}
  >
    <div className="bg-white p-4 rounded-lg shadow-md w-1/2 relative">
      {children}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✖
      </button>
    </div>
  </div>
);

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
    onCreate(newStudent);
    setIsOpen(false);
  };

  const handleImageUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagen(URL.createObjectURL(archivo));
    }
  };

  return (
    <ModalTemplate isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2 className="text-lg text-gray-900 mb-4">Crear Estudiante</h2>
      <form>
        <div className="mb-4">
          <Label>Imagen de Perfil:</Label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="file-input"
          />
          <Button
            variant="primary"
            className="bg-[#FEAB5F] text-white"
            onClick={() => document.getElementById('file-input').click()}
          >
            Cargar Foto
          </Button>
          {imagen && <img src={imagen} alt="Perfil" className="mt-2 w-16 h-16 object-cover rounded-full" />}
        </div>

        <div className="mb-4">
          <Label>Email:</Label>
          <InputTemplate
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese correo electrónico"
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <Label>Teléfono:</Label>
          <InputTemplate
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ingrese número de teléfono"
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <Label>Nombre:</Label>
          <InputTemplate
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese nombre"
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <Label>Lengua Nativa:</Label>
          <select
            value={lengua}
            onChange={(e) => setLengua(e.target.value)}
            className="w-full p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
          >
            <option value="ingles">Inglés</option>
            <option value="frances">Francés</option>
            <option value="ruso">Ruso</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="primary"
            className="bg-[#FEAB5F] text-black"
            onClick={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            Guardar
          </Button>
          <Button
            variant="secondary"
            className="bg-gray-500 text-black"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </ModalTemplate>
  );
}