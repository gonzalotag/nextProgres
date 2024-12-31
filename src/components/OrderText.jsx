"use client";
import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';
import Label from '@/templates/Labels';


const DraggableText = () => {
  const [title, setTitle] = useState("");
  const [textToComplete, setTextToComplete] = useState("");
  const [droppedTexts, setDroppedTexts] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [feedback, setFeedback] = useState(Array(3).fill(null));

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextToComplete(inputText);
    extractWords(inputText);
  };

  const extractWords = (text) => {
    const regex = /\[(.*?)\]/g;
    const words = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      words.push(match[1]);
    }
    setDroppedTexts(Array(words.length).fill(""));
    setCorrectWords(words);
  };

  const handleDragStart = (e, text) => {
    e.dataTransfer.setData("text/plain", text);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    if (text) {
      const updatedTexts = [...droppedTexts];
      updatedTexts[index] = text;
      setDroppedTexts(updatedTexts);
      checkAnswer(text, index);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = (text, index) => {
    if (text === correctWords[index]) {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = "Correct!";
        return newFeedback;
      });
    } else {
      setFeedback((prev) => {
        const newFeedback = [...prev];
        newFeedback[index] = "Incorrect!";
        return newFeedback;
      });
    }
  };

  const DroppableContainer = ({ index }) => (
    <div className="rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
      <div
        className="border-dashed border-2 border-gray-300 p-4 w-full h-24 flex items-center justify-center"
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {droppedTexts[index] ? (
          <span className="text-gray-800">{droppedTexts[index]} - {feedback[index]}</span>
        ) : (
          <span className="text-gray-400">Poner palabra aquí</span>
        )}
      </div>
    </div>
  );

  const handleSave = () => {
    // Implementar la lógica de guardado aquí
    console.log("Title:", title);
    console.log("Text to complete:", textToComplete);
    console.log("Dropped texts:", droppedTexts);
  };

  const handleCancel = () => {
    setTitle("");
    setTextToComplete("");
    setDroppedTexts([]);
    setCorrectWords([]);
    setFeedback(Array(3).fill(null));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Label htmlFor="title">Título:</Label>
        <InputTemplate
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingrese título de ejercicio"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="textToComplete">Texto a completar:</Label>
        <label className="block mb-2">
          El texto entre "[ ]" se usará para formar la oración:
        </label>
        <textarea
          value={textToComplete}
          onChange={handleTextChange}
          className="border rounded p-2 w-full h-24"
        />
      </div>

      <div className="flex space-x-8 mb-4">
        {/* Draggable Texts */}
        <div className="flex flex-col space-y-4">
          {correctWords.map((word, index) => (
            <div
              key={index}
              className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Droppable Containers */}
        <div className="flex space-x-4">
          {correctWords.map((_, index) => (
            <DroppableContainer key={index} index={index} />
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={handleSave} variant="primary">
          Guardar
        </Button>
        <Button onClick={handleCancel} variant="secondary">
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default DraggableText;
