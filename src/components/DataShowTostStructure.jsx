import React, { useState } from "react";

const initialData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "User" },
  { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "User" },
  { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", role: "User" },
];

export default function DataShowTostStructure() {
  const [items, setItems] = useState(initialData);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
    setIsDragging(true);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedItemIndex];

    newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItemIndex(null);
  };

  const handleSubmit = () => {
    console.log("Arranged Data:", items);
  };

  return (
      <div className="max-w-full px-20 mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Draggable Toast Data
        </h1>

        <div className="space-y-3">
          {items.map((item, index) => (
              <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`
              cursor-move shadow-md rounded-lg p-4 border border-gray-200 
              transition-all duration-300 ease-in-out
              ${isDragging && draggedItemIndex === index ? "opacity-0" : "opacity-100"}
              ${isDragging && draggedItemIndex !== index ? "bg-gray-50" : "bg-white"}
            `}
              >
                <p className="text-xs text-gray-500">{item.id}</p>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.email}</p>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit Arrangement
          </button>
        </div>
      </div>
  );
}
