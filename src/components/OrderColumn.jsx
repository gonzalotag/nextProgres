'use client'
import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

export function WordMatchGame({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [pairs, setPairs] = useState([{ spanish: '', english: '' }]);

  const addPair = () => {
    setPairs([...pairs, { spanish: '', english: '' }]);
  };

  const updatePair = (index, field, value) => {
    const newPairs = pairs.map((pair, i) =>
      i === index ? { ...pair, [field]: value } : pair
    );
    setPairs(newPairs);
  };

  const removePair = (index) => {
    setPairs(pairs.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (title.trim() === '') {
      alert('Por favor Agregue un Titulo');
      return;
    }

    const validPairs = pairs.filter(pair => pair.spanish.trim() && pair.english.trim());
    if (validPairs.length < 2) {
      alert('Agregue almenos 2 para completar el ejercicio');
      return;
    }

    onSave(title, validPairs);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ejercicio Emparejar Palabras</h2>
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Titulo:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ingrese titulo de ejercicio"
        />
      </div>

      <div className="space-y-4 mb-6">
        {pairs.map((pair, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                value={pair.spanish}
                onChange={(e) => updatePair(index, 'spanish', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="palabra Español"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={pair.english}
                onChange={(e) => updatePair(index, 'english', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="palabra ingles"
              />
            </div>
            {pairs.length > 1 && (
              <button
                onClick={() => removePair(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addPair}
        className="mb-6 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800"
      >
        <Plus size={20} />
        agregar pareja de palabras
      </button>

      <div className="flex justify-end gap-4">
      <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Save size={20} />
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md"
        >
          Cancelar
        </button>
        
      </div>
    </div>
  );
}