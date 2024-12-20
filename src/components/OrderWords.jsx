'use client'
import React, { useState } from 'react';
import DroppableContainer from './DroppableContainer';
import DraggableLetter from './DraggableLetter';
import { shuffleArray } from '../utils/ArrayUtils';

const DraggableLetters = () => {
  const [title, setTitle] = useState("");
  const [word, setWord] = useState("");
  const [droppedLetters, setDroppedLetters] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState([]);

  const handleWordChange = (e) => {
    const inputWord = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(inputWord)) {
      setWord(inputWord);
      setDroppedLetters(Array(inputWord.length).fill(""));
      setFeedback(Array(inputWord.length).fill(null));
      setShuffledLetters(shuffleArray(inputWord.split('')));
    }
  };

  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData("text/plain", letter);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData("text/plain");
    if (letter) {
      const updatedLetters = [...droppedLetters];
      updatedLetters[index] = letter;
      setDroppedLetters(updatedLetters);
      checkAnswer(letter, index);
    }
  };

  const checkAnswer = (letter, index) => {
    const correct = letter === word[index];
    setFeedback((prev) => {
      const newFeedback = [...prev];
      newFeedback[index] = correct ? "Correct!" : "Incorrect!";
      return newFeedback;
    });
  };

  const handleSave = () => {
    console.log("Title:", title);
    console.log("Word:", word);
    console.log("Dropped letters:", droppedLetters);
  };

  const handleCancel = () => {
    setTitle("");
    setWord("");
    setDroppedLetters([]);
    setFeedback([]);
    setShuffledLetters([]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">juego de arrastrar y soltar letras</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Titulo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter activity title"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Palabra a formar:</label>
          <input
            type="text"
            value={word}
            onChange={handleWordChange}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a word (letters only)"
          />
        </div>

        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
          {/* Draggable Letters */}
          <div className="flex flex-wrap gap-4">
            {shuffledLetters.map((letter, index) => (
              <DraggableLetter
                key={index}
                letter={letter}
                onDragStart={handleDragStart}
              />
            ))}
          </div>

          {/* Droppable Containers */}
          <div className="flex flex-wrap gap-4">
            {word && Array.from({ length: word.length }).map((_, index) => (
              <DroppableContainer
                key={index}
                index={index}
                onDrop={handleDrop}
                droppedLetters={droppedLetters}
                feedback={feedback}
              />
            ))}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button 
            onClick={handleSave}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-green-500 focus:ring-offset-2"
          >
            Guardar
          </button>
          <button 
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-red-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableLetters;