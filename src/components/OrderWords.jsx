'use client';
import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';
import DroppableContainer from '@/components/DroppableContainer';
import DraggableLetter from '@/components/DraggableLetter';
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Juego de arrastrar y soltar letras
      </h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Título:</Label>
          <InputTemplate
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese título de la actividad"
          />
        </div>

        <div>
          <Label htmlFor="word">Palabra a formar:</Label>
          <InputTemplate
            id="word"
            value={word}
            onChange={handleWordChange}
            placeholder="Ingrese una palabra (solo letras)"
          />
        </div>

        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
          {/* Letras arrastrables */}
          <div className="flex flex-wrap gap-4">
            {shuffledLetters.map((letter, index) => (
              <DraggableLetter
                key={index}
                letter={letter}
                onDragStart={handleDragStart}
              />
            ))}
          </div>

          {/* Contenedores para soltar */}
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
          <Button onClick={handleSave} variant="primary">
            Guardar
          </Button>
          <Button onClick={handleCancel} variant="secondary">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DraggableLetters;
