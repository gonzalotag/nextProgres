'use client'
import React, { useState } from 'react';
import './DropdownParagraph.css'; // Importamos un archivo CSS personalizado

const DropdownParagraph = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    option1: "",
    option2: "",
  });

  const options = {
    option1: ["rápido", "lento", "moderado"],
    option2: ["camino", "sendero", "carretera"],
  };

  const handleChange = (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <div className='text-black'>
        El zorro <div className="custom-select">
          <select
            value={selectedOptions.option1}
            onChange={(e) => handleChange("option1", e.target.value)}
          >
            <option value="" disabled>Seleccione</option>
            {options.option1.map((opt, index) => (
              <option key={index} value={opt}>{opt}</option>
            ))}
          </select>
        </div> cruzó el <div className="custom-select">
          <select
            value={selectedOptions.option2}
            onChange={(e) => handleChange("option2", e.target.value)}
          >
            <option value="" disabled>Seleccione</option>
            {options.option2.map((opt, index) => (
              <option key={index} value={opt}>{opt}</option>
            ))}
          </select>
        </div> con agilidad.
      </div>

      <p>Seleccionaste: "{selectedOptions.option1}" y "{selectedOptions.option2}".</p>
    </div>
  );
};

export default DropdownParagraph;