import React from 'react';

const IngredientList = ({ title, ingredients }) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-700 mb-1">{title}:</h4>
    <p className="text-sm text-gray-600 line-clamp-2">
      {ingredients.map(i => i.name).join(', ')}
    </p>
  </div>
);

export default IngredientList;