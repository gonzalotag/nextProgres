'use client';

import React from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import TextAreaTemplate from '@/templates/TextAreaTemplate';
import Label from '@/templates/Labels';
import Button from '@/templates/Button';

const formFields = [
  { name: 'name', label: 'Nombre de la clase', type: 'text' },
  { name: 'students', label: 'Numero de estudiantes', type: 'number' },
  { name: 'level', label: 'Nivel', type: 'text' },
  { name: 'language', label: 'Idioma', type: 'text' },
  { name: 'schedule', label: 'Horario', type: 'text', placeholder: 'Ejemplo: Lunes, Miércoles, Viernes' },
];

export default function ClassForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {formFields.map(({ name, label, type, placeholder }) => (
        <div key={name}>
          <Label className="text-gray-700">{label}</Label>
          <InputTemplate
            type={type}
            name={name}
            value={formData[name]}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
          />
        </div>
      ))}
      
      <div>
        <Label className="text-gray-700">Descripción</Label>
        <TextAreaTemplate
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FEAB5F] focus:border-[#FEAB5F]"
        />
      </div>

      <Button type="submit" className="w-full">
        Crear clase
      </Button>
    </form>
  );
}