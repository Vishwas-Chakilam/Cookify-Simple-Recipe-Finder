import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const RecipeFooter = ({ missedIngredientCount, sourceUrl }) => (
  <div className="mt-6 flex justify-between items-center">
    <span className="text-sm font-medium text-gray-500">
      {missedIngredientCount} missing
    </span>
    <a
      href={sourceUrl}
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
);

export default RecipeFooter;
