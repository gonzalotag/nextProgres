// components/templates/DroppableContainer.js
import React from 'react';

const DroppableContainer = ({ droppedText, feedback, onDrop, onDragOver }) => {
  return (
    <div
      className="border-dashed border-2 border-gray-300 p-2 w-32 h-10 flex items-center justify-center mx-1"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {droppedText ? (
        <span className="text-gray-800 text-sm">
          {droppedText} - {feedback}
        </span>
      ) : (
        <span className="text-gray-400 text-sm">Drop here</span>
      )}
    </div>
  );
};

export default DroppableContainer;
