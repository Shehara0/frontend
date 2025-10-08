import React from "react";

export default function ProductCard({ name, image, price }) {
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800 truncate">{name}</h1>
        <p className="text-gray-600 text-sm mt-1">${price}</p>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          View More
        </button>
      </div>
    </div>
  );
}
