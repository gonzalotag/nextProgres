'use client'
import React, { useState } from 'react';
import './SingleSelectQuestion.css'; // Archivo CSS para estilos personalizados

const SingleSelectQuestion = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="single-select-question">
      <h3 className='text-red-500'>{question}</h3>
      <div className="options-container">
        {options.map((option, index) => (
          <div key={index} className={`option text-black ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionChange(option)}>
            {option}
          </div>
        ))}
      </div>
      {selectedOption && <p>Has seleccionado: {selectedOption}</p>}
    </div>
  );
};

export default SingleSelectQuestion;
