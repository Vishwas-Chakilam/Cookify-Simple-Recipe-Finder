import React from 'react';

const RecipeHeader = ({ image, title }) => (
  <div className="relative">
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <h3 className="text-xl font-bold text-gray-800 p-6 line-clamp-2 
                   group-hover:text-orange-500 transition-colors">
      {title}
    </h3>
  </div>
);

export default RecipeHeader;