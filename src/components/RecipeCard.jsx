import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card group bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <div className="relative flex-shrink-0">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 
                     group-hover:text-orange-500 transition-colors"
        >
          {recipe.title}
        </h3>

        <div className="space-y-4 flex-grow">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Available Ingredients:
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {recipe.usedIngredients.map((i) => i.name).join(', ')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Missing Ingredients:
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {recipe.missedIngredients.map((i) => i.name).join(', ')}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            {recipe.missedIngredientCount} missing
          </span>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r 
                     from-orange-500 to-amber-500 text-white text-sm font-medium 
                     rounded-lg hover:from-orange-600 hover:to-amber-600 
                     transition-colors"
          >
            View Recipe <FaExternalLinkAlt className="ml-2 text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
