'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí defines las credenciales válidas
    const validEmail = 'usuario@example.com'; // Cambia esto por el email que desees
    const validPassword = 'contrasenia'; // Cambia esto por la contraseña que desees

    // Verifica las credenciales
    const { email, password } = formData;

    if (email === validEmail && password === validPassword) {
      // Crea el objeto con las credenciales
      const userCredentials = {
        email,
        password,
      };

      // Muestra el objeto en la consola
      console.log('Inicio de sesión exitoso:', userCredentials);

      // Simula guardar en localStorage (opcional)
      localStorage.setItem('userEmail', email);

      // Redirige al usuario a la página de administración
      router.push('/Admin'); // Cambia '/Admin' por la ruta correcta de tu Dashboard
    } else {
      console.log('Credenciales incorrectas');
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#FEAB5F]">
          Iniciar Sesión
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Correo Electrónico:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FEAB5F]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Contraseña:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FEAB5F]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FEAB5F] text-gray-900 font-semibold py-2 rounded-md hover:bg-[#ffa048] transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          ¿No tienes cuenta?{' '}
          <a href="#" className="text-[#FEAB5F] hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
