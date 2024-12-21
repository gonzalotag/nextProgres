'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateClassPage() {
  const router = useRouter();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    students: '',
    level: '',
    duration: '',
    language: '',
    schedule: '', // Formato: "Lunes y Miércoles"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const manejarSeleccionImagen = (event) => {
    const archivo = event.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagenSeleccionada(URL.createObjectURL(archivo));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparar los datos para ClassCard
    const newClass = {
      id: Date.now().toString(),
      ...formData,
      students: parseInt(formData.students, 10),
      language: { name: formData.language }, // Convertimos a objeto
      schedule: formData.schedule.split(',').map((day) => day.trim()), // Convertir a array
      image: imagenSeleccionada, // Agregar imagen
    };

    // Guardar en localStorage
    const storedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    localStorage.setItem('classes', JSON.stringify([...storedClasses, newClass]));

    // Redirigir
    router.push('/Classes');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[80px]">
      <div className="flex items-center mb-6">
        <ArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer text-[#FEAB5F] mr-3"
        />
        <h2 className="text-xl font-semibold text-black">Crear nueva clase</h2>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col mb-4">
              <label className="text-lg mb-2">Imagen:</label>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={manejarSeleccionImagen}
                  className="hidden"
                  id="file-input"
                />
                <button
                  onClick={() => document.getElementById('file-input').click()}
                  className="bg-[#FEAB5F] hover:bg-[#FE9B3F] text-white py-2 px-4 rounded"
                >
                  Cargar imagen
                </button>
                {imagenSeleccionada && (
                  <div className="ml-4 w-16 h-16">
                    <img
                      src={imagenSeleccionada}
                      alt="Vista previa"
                      className="max-w-full h-auto rounded-lg transition-transform duration-300 hover:scale-125"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de la clase</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Numero de estudiantes</label>
              <input
                type="number"
                name="students"
                value={formData.students}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nivel</label>
              <input
                type="text"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Idioma</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Horario</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                required
                placeholder="Ejemplo: Lunes, Miércoles, Viernes"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-[#FEAB5F] text-white py-2 px-4 rounded-md hover:bg-[#E69C42] transition duration-300"
              >
                Crear clase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
