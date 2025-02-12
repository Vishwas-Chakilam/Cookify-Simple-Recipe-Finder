import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoriteButton = ({ isFavorite, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-colors ${
      isFavorite 
        ? 'text-red-500 hover:text-red-600' 
        : 'text-gray-400 hover:text-red-500'
    }`}
  >
    {isFavorite ? <FaHeart /> : <FaRegHeart />}
  </button>
);

export default FavoriteButton;