import React from 'react';

const RecipeImage = ({ image, title }) => {
  return (
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default RecipeImage;