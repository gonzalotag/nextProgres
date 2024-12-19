'use client'

import React, { useState } from 'react'

const SingleSelectQuestion = () => {
  const [title, setTitle] = useState("")
  const [parts, setParts] = useState([""])
  const [shuffledParts, setShuffledParts] = useState([])
  const [disorderedParts, setDisorderedParts] = useState([])
  const [feedback, setFeedback] = useState([])

  const handleAddPart = () => {
    setParts([...parts, ""])
  }

  const handlePartChange = (index, value) => {
    const updatedParts = [...parts]
    updatedParts[index] = value
    setParts(updatedParts)
  }

  const handleSave = () => {
    const filtered = parts.filter(part => part.trim() !== "")
    const shuffled = shuffleArray(filtered)
    setShuffledParts(filtered)
    setDisorderedParts(shuffled)
    setFeedback(Array(filtered.length).fill(null))
  }

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    const text = e.dataTransfer.getData("text/plain")
    if (text) {
      const updatedFeedback = [...feedback]
      updatedFeedback[index] = text === shuffledParts[index] ? "OK!" : "X"
      setFeedback(updatedFeedback)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="single-select-question p-4 max-w-md mx-auto">
      <h3 className="text-red-500 font-bold mb-2">Título:</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />

      <h3 className="text-red-500 font-bold mb-2">Parts of the text:</h3>
      {parts.map((part, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={part}
            onChange={(e) => handlePartChange(index, e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
      ))}
      <button onClick={handleAddPart} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Part</button>

      <div className="flex space-x-2 mb-4">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={() => {
          setTitle("")
          setParts([""])
          setShuffledParts([])
          setDisorderedParts([])
          setFeedback([])
        }} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>

      {shuffledParts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-red-500 font-bold mb-2">Arrastra y ordena las partes:</h3>
          <div className="flex flex-col">
            {disorderedParts.map((part, index) => (
              <div
                key={index}
                className="border p-2 mb-2 bg-gray-100 cursor-move"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", part)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                {part} {feedback[index] && <span className={feedback[index] === "OK!" ? "text-green-500" : "text-red-500"}>{feedback[index]}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleSelectQuestion

