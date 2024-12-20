import React from 'react';

const DroppableContainer = ({ index, onDrop, droppedLetters, feedback }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="rounded-lg p-4 flex flex-col items-center justify-center space-y-4 w-24 h-24">
      <div
        className="border-dashed border-2 border-gray-300 p-4 w-full h-full flex items-center justify-center"
        onDrop={(e) => onDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {droppedLetters[index] ? (
          <div className={`text-xl font-bold ${feedback[index] === 'Correct!' ? 'text-green-600' : 'text-red-600'}`}>
            {droppedLetters[index]}
            {feedback[index] && (
              <div className={`text-xs mt-1 ${feedback[index] === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
                {feedback[index]}
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Drop here</span>
        )}
      </div>
    </div>
  );
};

export default DroppableContainer;