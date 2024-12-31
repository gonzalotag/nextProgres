'use client';

import React, { useState } from 'react';
import { InputTemplate } from '@/templates/InputTemplate';
import Button from '@/templates/Button';

const DroppableArea = ({ imageSrc, text, onDrop, onDragOver }) => (
  <div className="border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
    <div
      className="border-dashed border-2 border-gray-300 p-4 w-full h-24 flex items-center justify-center"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {text ? (
        <span className="text-gray-800">{text}</span>
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

const DraggableText = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [randomWords, setRandomWords] = useState([]);
  const [droppedTexts, setDroppedTexts] = useState(Array(3).fill(''));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (previewImage && text) {
      setImages([...images, { src: previewImage, text }]);
      setPreviewImage(null);
      setText('');
    }
  };

  const handleSave = () => {
    const words = images.map((image) => image.text);
    setRandomWords(shuffleArray(words));
    setDroppedTexts(Array(words.length).fill(''));
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedText = e.dataTransfer.getData('text/plain');
    if (draggedText) {
      const updatedTexts = [...droppedTexts];
      updatedTexts[index] = draggedText;
      setDroppedTexts(updatedTexts);
    }
  };

  const handleReset = () => {
    setTitle('');
    setImages([]);
    setPreviewImage(null);
    setText('');
    setRandomWords([]);
    setDroppedTexts([]);
  };

  return (
    <div className="p-4">
      <InputTemplate
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ingrese un título"
      />

      <div className="mb-4">
        <label className="block mb-2">Cargar Imagen:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border rounded p-2 w-full"
        />
        {previewImage && (
          <div className="mt-2">
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}
      </div>

      <InputTemplate
        label="Texto para emparejar a la imagen:"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ingrese el texto relacionado"
      />

      <Button onClick={handleAddImage} variant="primary">
        Agregar Imagen
      </Button>

      <div className="flex space-x-8 mb-4 mt-6">
        {/* Draggable Texts */}
        <div className="flex flex-col space-y-4">
          {randomWords.map((word, index) => (
            <div
              key={index}
              className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', word)}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Droppable Containers */}
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <DroppableArea
              key={index}
              imageSrc={image.src}
              text={droppedTexts[index]}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={(e) => e.preventDefault()}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={handleSave} variant="primary">
          Guardar
        </Button>
        <Button onClick={handleReset} variant="neutral">
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default DraggableText;
