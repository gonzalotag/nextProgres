"use client";
import React, { useState } from 'react';

const DraggableWords = () => {
  const [title, setTitle] = useState("");
  const [textToComplete, setTextToComplete] = useState("");
  const [droppedTexts, setDroppedTexts] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [displayText, setDisplayText] = useState([]);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setTextToComplete(inputText);
    extractWords(inputText);
  };

  const extractWords = (text) => {
    const regex = /\[(.*?)\]/g;
    const words = [];
    const newDisplayText = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const word = match[1];
      words.push(word);
      
      if (match.index > lastIndex) {
        newDisplayText.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      
      newDisplayText.push({ type: 'drop', index: words.length - 1 });
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      newDisplayText.push({ type: 'text', content: text.slice(lastIndex) });
    }

    setDroppedTexts(Array(words.length).fill(""));
    setCorrectWords(words);
    setFeedback(Array(words.length).fill(null));
    setDisplayText(newDisplayText);
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

  const DroppableContainer = ({ index }) => {
    return (
      <div
        className="border-dashed border-2 border-gray-300 p-2 w-32 h-10 flex items-center justify-center mx-1"
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {droppedTexts[index] ? (
          <span className="text-gray-800 text-sm">{droppedTexts[index]} - {feedback[index]}</span>
        ) : (
          <span className="text-gray-400 text-sm">Drop here</span>
        )}
      </div>
    );
  };

  const handleSave = () => {
    console.log("Title:", title);
    console.log("Text to complete:", textToComplete);
    console.log("Dropped texts:", droppedTexts);
  };

  const handleCancel = () => {
    setTitle("");
    setTextToComplete("");
    setDroppedTexts([]);
    setCorrectWords([]);
    setFeedback([]);
    setDisplayText([]);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Text to complete:</label>
        <label className="block mb-2">El texto entre "[ ]" se usará para formar la oración:</label>
        <textarea
          value={textToComplete}
          onChange={handleTextChange}
          className="border rounded p-2 w-full h-24"
        />
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
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

        <div className="border rounded p-4 flex flex-wrap items-center">
          {displayText.map((item, index) => 
            item.type === 'text' ? (
              <span key={index} className="mr-1">{item.content}</span>
            ) : (
              <DroppableContainer key={index} index={item.index} />
            )
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
};

export default DraggableWords;

