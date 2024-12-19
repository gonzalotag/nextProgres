'use client'

import React, { useState } from 'react';

const DraggableText = () => {
  const [draggedText, setDraggedText] = useState("");

  const handleDragStart = (e, text) => {
    e.dataTransfer.setData("text/plain", text);
    setDraggedText(text);
  };

  const handleDrop = (e, setDroppedText) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    if (text) setDroppedText(text);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const DroppableContainer = ({ imageSrc }) => {
    const [droppedText, setDroppedText] = useState("");

    return (
      <div className="border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
        <div
          className="border-dashed border-2 border-gray-300 p-4 w-full h-24 flex items-center justify-center"
          onDrop={(e) => handleDrop(e, setDroppedText)}
          onDragOver={handleDragOver}
        >
          {droppedText ? (
            <span className="text-gray-800">{droppedText}</span>
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

      {/* Droppable Container */}
      <DroppableContainer imageSrc="https://via.placeholder.com/64" />
    </div>
  );
};

export default DraggableText;





// import React, { useState } from 'react';

// const DraggableText = () => {
//   const [draggedText, setDraggedText] = useState("");

//   const handleDragStart = (e, text) => {
//     e.dataTransfer.setData("text/plain", text);
//     setDraggedText(text);
//   };

//   const handleDrop = (e, setDroppedText) => {
//     e.preventDefault();
//     const text = e.dataTransfer.getData("text/plain");
//     setDroppedText(text);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const DroppableContainer = ({ imageSrc }) => {
//     const [droppedText, setDroppedText] = useState("");

//     return (
//       <div className="border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
//         <div
//           className="border-dashed border-2 border-gray-300 p-4 w-full h-24 flex items-center justify-center"
//           onDrop={(e) => handleDrop(e, setDroppedText)}
//           onDragOver={handleDragOver}
//         >
//           {droppedText || <span className="text-gray-400">Drop text here</span>}
//         </div>
//         <img
//           src={imageSrc}
//           alt="Reference"
//           className="w-16 h-16 object-cover rounded-full"
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="flex space-x-8">
//       {/* Draggable Texts */}
//       <div className="flex flex-col space-y-4">
//         {['Example Text 1', 'Example Text 2', 'Example Text 3'].map((text, index) => (
//           <div
//             key={index}
//             className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-200"
//             draggable
//             onDragStart={(e) => handleDragStart(e, text)}
//           >
//             {text}
//           </div>
//         ))}
//       </div>

//       {/* Droppable Container */}
//       <DroppableContainer imageSrc="https://via.placeholder.com/64" />
//     </div>
//   );
// };

// export default DraggableText;




// import React, { useState } from "react";

// const WordImageMatch = () => {
//   // Palabras e imágenes
//   const items = [
//     { id: 1, word: "Apple", image: "https://via.placeholder.com/100?text=Apple" },
//     { id: 2, word: "Dog", image: "https://via.placeholder.com/100?text=Dog" },
//     { id: 3, word: "Car", image: "https://via.placeholder.com/100?text=Car" },
//   ];

//   // Estado para almacenar las asociaciones
//   const [selectedWord, setSelectedWord] = useState(null);
//   const [matches, setMatches] = useState([]);

//   // Manejar la selección de palabras
//   const handleWordClick = (word) => {
//     setSelectedWord(word);
//   };

//   // Manejar la selección de imágenes
//   const handleImageClick = (id) => {
//     if (selectedWord) {
//       const match = items.find(
//         (item) => item.word === selectedWord && item.id === id
//       );

//       if (match && !matches.includes(id)) {
//         setMatches([...matches, id]);
//       }

//       setSelectedWord(null); // Reiniciar la selección
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="flex space-x-4">
//         {items.map((item) => (
//           <button
//             key={item.word}
//             onClick={() => handleWordClick(item.word)}
//             className={`px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-200 transition ${
//               selectedWord === item.word ? "bg-blue-300" : "bg-white"
//             }`}
//           >
//             {item.word}
//           </button>
//         ))}
//       </div>

//       <div className="flex space-x-4">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleImageClick(item.id)}
//             className={`p-2 border rounded-lg cursor-pointer ${
//               matches.includes(item.id) ? "bg-green-200" : "bg-white"
//             }`}
//           >
//             <img
//               src={item.image}
//               alt={item.word}
//               className="w-24 h-24 object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="text-center">
//         {matches.length === items.length ? (
//           <p className="text-green-600 font-bold">¡Felicidades! Has completado todas las asociaciones.</p>
//         ) : (
//           <p className="text-gray-600">Selecciona una palabra y luego la imagen correspondiente.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WordImageMatch;
