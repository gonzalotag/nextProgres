'use client'
import React, { useState } from 'react';
import './WordMatchGame.css'; // Archivo CSS para estilos personalizados

const WordMatchGame = ({ spanishWords, englishWords }) => {
  const [selectedSpanish, setSelectedSpanish] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const handleSpanishClick = (word) => {
    if (selectedEnglish) {
      setMatchedPairs((prev) => [...prev, { spanish: word, english: selectedEnglish }]);
      setSelectedSpanish(null);
      setSelectedEnglish(null);
    } else {
      setSelectedSpanish(word);
    }
  };

  const handleEnglishClick = (word) => {
    if (selectedSpanish) {
      setMatchedPairs((prev) => [...prev, { spanish: selectedSpanish, english: word }]);
      setSelectedSpanish(null);
      setSelectedEnglish(null);
    } else {
      setSelectedEnglish(word);
    }
  };

  const unmatchedSpanish = spanishWords?.filter(
    (word) => !matchedPairs.some((pair) => pair.spanish === word)
  );
  const unmatchedEnglish = englishWords?.filter(
    (word) => !matchedPairs.some((pair) => pair.english === word)
  );

  return (
    <div className="text-black word-match-game">
      <div className="text-black column">
        <h3>Español</h3>
        {unmatchedSpanish?.map((word, index) => (
          <div
            key={index}
            className={`word ${selectedSpanish === word ? 'selected' : ''}`}
            onClick={() => handleSpanishClick(word)}
          >
            {word}
          </div>
        ))}
      </div>
      <div className="text-black column">
        <h3>Inglés</h3>
        {unmatchedEnglish?.map((word, index) => (
          <div
            key={index}
            className={`word ${selectedEnglish === word ? 'selected' : ''}`}
            onClick={() => handleEnglishClick(word)}
          >
            {word}
          </div>
        ))}
      </div>
      <div className="text-black matched-pairs">
        <h3>Parejas Emparejadas</h3>
        {matchedPairs?.map((pair, index) => (
          <div key={index} className="text-black pair">
            <div className="text-black spanish">{pair.spanish}</div>
            <div className="text-black english">{pair.english}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordMatchGame;
