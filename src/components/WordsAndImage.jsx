
'use client';

import React, { useState } from 'react';

const DraggableText = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [randomWords, setRandomWords] = useState([]);
  const [droppedTexts, setDroppedTexts] = useState(Array(3).fill(""));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (previewImage && text) {
      setImages([...images, { src: previewImage, text }]);
      setPreviewImage(null);
      setText("");
    }
  };

  const handleSave = () => {
    const words = images.map(image => image.text);
    setRandomWords(shuffleArray(words));
    setDroppedTexts(Array(words.length).fill(""));
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
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
      <div className="border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
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
        <img
          src={imageSrc}
          alt="Reference"
          className="w-16 h-16 object-cover rounded-full"
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2">Titulo:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
      <label className="block mb-2">La imagen seleccionada debe ir con un texto para emparejar:</label>
        <label className="block mb-2">Cargar Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border rounded p-2 w-full"
        />
        {previewImage && (
          <div className="mt-2">
            <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover border rounded" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Texto para emparejar a la imagen:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button onClick={handleAddImage} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Agregar imagen</button>
      </div>

      <div className="flex space-x-8 mb-4">
        {/* Draggable Texts */}
        <div className="flex flex-col space-y-4">
          {randomWords.map((word, index) => (
            <div
              key={index}
              className ="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", word)}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Droppable Containers for Images */}
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <DroppableContainer key={index} imageSrc={image.src} index={index} />
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={() => {
          setTitle("");
          setImages([]);
          setPreviewImage(null);
          setText("");
          setRandomWords([]);
          setDroppedTexts([]);
        }} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
};

export default DraggableText;



