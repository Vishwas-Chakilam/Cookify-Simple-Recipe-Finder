import React from 'react';
import { FaUtensils, FaClock } from 'react-icons/fa';

const IngredientSection = ({ title, ingredients, icon: Icon }) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
      <Icon className="mr-2 text-blue-500" /> {title}
    </h4>
    <p className="text-sm text-gray-600 line-clamp-2">
      {ingredients.map(i => i.name).join(', ')}
    </p>
  </div>
);

const RecipeIngredients = ({ usedIngredients, missedIngredients }) => {
  return (
    <div className="space-y-4">
      <IngredientSection
        title="Available Ingredients"
        ingredients={usedIngredients}
        icon={FaUtensils}
      />
      <IngredientSection
        title="Missing Ingredients"
        ingredients={missedIngredients}
        icon={FaClock}
      />
    </div>
  );
};

export default RecipeIngredients;