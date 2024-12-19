// "use client"
// import React, { useState } from 'react';

// const DraggableText = () => {
//   const [draggedText, setDraggedText] = useState("");
//   const [droppedTexts, setDroppedTexts] = useState(Array(3).fill(""));

//   const handleDragStart = (e, text) => {
//     e.dataTransfer.setData("text/plain", text);
//     setDraggedText(text);
//   };

//   const handleDrop = (e, index) => {
//     e.preventDefault();
//     const text = e.dataTransfer.getData("text/plain");
//     if (text) {
//       const updatedTexts = [...droppedTexts];
//       updatedTexts[index] = text;
//       setDroppedTexts(updatedTexts);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const DroppableContainer = ({ imageSrc, index }) => {
//     return (
//       <div className=" rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
//         <div
//           className="border-dashed border-2 border-gray-300 p-4 w-full h-24 flex items-center justify-center"
//           onDrop={(e) => handleDrop(e, index)}
//           onDragOver={handleDragOver}
//         >
//           {droppedTexts[index] ? (
//             <span className="text-gray-800">{droppedTexts[index]}</span>
//           ) : (
//             <span className="text-gray-400">Drop text here</span>
//           )}
//         </div>
//         {/* <img
//           src={imageSrc}
//           alt="Reference"
//           className="w-16 h-16 object-cover rounded-full"
//         /> */}
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

//       {/* Droppable Containers */}
//       <div className="flex space-x-4">
//         {['https://via.placeholder.com/64', 'https://via.placeholder.com/64', 'https://via.placeholder.com/64'].map((src, index) => (
//           <DroppableContainer key={index} imageSrc={src} index={index} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DraggableText;

"use client";
import React, { useState } from 'react';

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

  const DroppableContainer = ({ index }) => {
    return (
      <div className="rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-64 h-64">
        <div
          className="border-dashed border-2 border-gray-300 p-4 w-full h-24 flex items-center justify-center"
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
        >
          {droppedTexts[index] ? (
            <span className="text-gray-800">{droppedTexts[index]} - {feedback[index]}</span>
          ) : (
            <span className="text-gray-400">Drop text here</span>
          )}
        </div>
      </div>
    );
  };

  const handleSave = () => {
    // Implement save logic here
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
            </ div>
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
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
};

export default DraggableText;