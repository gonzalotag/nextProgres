
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/templates/Button';
import { CardTemplate } from '@/templates/CardTemplate';
import { InputTemplate } from '@/templates/InputTemplate';
import Label from '@/templates/Labels';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === 'usuario@example.com' && formData.password === 'contrasenia') {
      localStorage.setItem('userEmail', formData.email);
      router.push('/Admin');
    }
  };

  return (
    <div className=' flex items-center justify-center min-h-screen'>
    <div className='flex flex-col items-center'>
    <CardTemplate className=" bg-gray-200 text-white p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#FEAB5F]">
        Iniciar Sesión
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {['email', 'password'].map((field) => (
          <div key={field}>
            <Label className="text-gray-300">
              {field === 'email' ? 'Correo Electrónico:' : 'Contraseña:'}
            </Label>
            <InputTemplate
              type={field}
              name={field}
              value={formData[field]}
              onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
              placeholder={`Ingresa tu ${field === 'email' ? 'correo' : 'contraseña'}`}
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FEAB5F]"
            />
          </div>
        ))}

        <Button type="submit" className="w-full font-semibold">
          Iniciar Sesión
        </Button>
      </form>

      <p className="text-gray-400 text-sm mt-4 text-center">
        ¿No tienes cuenta?{' '}
        <a href="#" className="text-[#FEAB5F] hover:underline">
          Regístrate aquí
        </a>
      </p>
    </CardTemplate>
    </div>
    </div>
  );
}