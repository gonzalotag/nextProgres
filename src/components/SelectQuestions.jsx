'use client'

import React, { useState } from 'react'

const SingleSelectQuestion = () => {
  const [title, setTitle] = useState("")
  const [parts, setParts] = useState([""])
  const [shuffledParts, setShuffledParts] = useState([])
  const [orderedParts, setOrderedParts] = useState([])
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
    setShuffledParts(shuffled)
    setOrderedParts(Array(filtered.length).fill(null))
    setFeedback(Array(filtered.length).fill(null))
  }

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const handleDragStart = (e, part) => {
    e.dataTransfer.setData("text/plain", part)
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    const part = e.dataTransfer.getData("text/plain")
    const newOrderedParts = [...orderedParts]
    newOrderedParts[index] = part
    setOrderedParts(newOrderedParts)
    
    const newFeedback = [...feedback]
    newFeedback[index] = part === parts[index] ? "OK!" : "X"
    setFeedback(newFeedback)
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

      <h3 className="text-red-500 font-bold mb-2">Partes del texto:</h3>
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
      <button onClick={handleAddPart} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Agregar Parte</button>

      <div className="flex space-x-2 mb-4">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={() => {
          setTitle("")
          setParts([""])
          setShuffledParts([])
          setOrderedParts([])
          setFeedback([])
        }} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
      </div>

      {shuffledParts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-red-500 font-bold mb-2">Arrastra las partes en el orden correcto:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {shuffledParts.map((part, index) => (
              <div
                key={index}
                className="border p-2 bg-gray-100 cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(e, part)}
              >
                {part}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {orderedParts.map((part, index) => (
              <div
                key={index}
                className="border p-2 h-12 flex items-center justify-between"
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                {part || "Arrastra aquí"}
                {feedback[index] && (
                  <span className={feedback[index] === "OK!" ? "text-green-500" : "text-red-500"}>
                    {feedback[index]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleSelectQuestion

