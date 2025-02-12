import React from 'react';

const IngredientList = ({ title, ingredients }) => {
  if (!ingredients?.length) return null;
  
  return (
    <div className="mb-3">
      <h4 className="text-sm font-semibold text-gray-700 mb-1">{title}</h4>
      <div className="flex flex-wrap gap-1">
        {ingredients.map((ingredient, index) => (
          <span 
            key={`${ingredient.id || ingredient.name}-${index}`}
            className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded"
          >
            {ingredient.name || ingredient.original}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;