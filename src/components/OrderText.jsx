"use client"
import React, { useState } from 'react';

const DraggableText = () => {
  const [draggedText, setDraggedText] = useState("");
  const [droppedTexts, setDroppedTexts] = useState(Array(3).fill(""));

  const handleDragStart = (e, text) => {
    e.dataTransfer.setData("text/plain", text);
    setDraggedText(text);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    if (text) {
      const updatedTexts = [...droppedTexts];
      updatedTexts[index] = text;
      setDroppedTexts(updatedTexts);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const DroppableContainer = ({ imageSrc, index }) => {
    return (
      <div className=" rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
        <div
          className="border-dashed border-2 border-gray-300 p-4 w-full h-24 flex items-center justify-center"
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
        >
          {droppedTexts[index] ? (
            <span className="text-gray-800">{droppedTexts[index]}</span>
          ) : (
            <span className="text-gray-400">Drop text here</span>
          )}
        </div>
        {/* <img
          src={imageSrc}
          alt="Reference"
          className="w-16 h-16 object-cover rounded-full"
        /> */}
      </div>
    );
  };

  return (
    <div className="flex space-x-8">
      {/* Draggable Texts */}
      <div className="flex flex-col space-y-4">
        {['Example Text 1', 'Example Text 2', 'Example Text 3'].map((text, index) => (
          <div
            key={index}
            className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
            draggable
            onDragStart={(e) => handleDragStart(e, text)}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Droppable Containers */}
      <div className="flex space-x-4">
        {['https://via.placeholder.com/64', 'https://via.placeholder.com/64', 'https://via.placeholder.com/64'].map((src, index) => (
          <DroppableContainer key={index} imageSrc={src} index={index} />
        ))}
      </div>
    </div>
  );
};

export default DraggableText;
