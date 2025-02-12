import React from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FavoriteButton = ({ isFavorite, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`p-2 rounded-full transition-colors ${
      isFavorite 
        ? 'text-yellow-500 hover:text-yellow-600' 
        : 'text-gray-400 hover:text-yellow-500'
    }`}
    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
  >
    <FaStar className="text-xl" />
  </motion.button>
);

export default FavoriteButton;