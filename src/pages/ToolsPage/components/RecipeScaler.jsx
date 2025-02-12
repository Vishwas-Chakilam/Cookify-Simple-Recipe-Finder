import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RecipeScaler = () => {
  const [ingredients, setIngredients] = useState('');
  const [scaleFactor, setScaleFactor] = useState(2);
  const [scaledIngredients, setScaledIngredients] = useState('');

  const scaleRecipe = () => {
    const lines = ingredients.split('\n');
    const scaled = lines.map(line => {
      const match = line.match(/^([\d./]+)\s*([a-zA-Z]+)\s+(.+)$/);
      if (match) {
        const [_, amount, unit, ingredient] = match;
        const scaledAmount = eval(amount) * scaleFactor;
        return `${scaledAmount} ${unit} ${ingredient}`;
      }
      return line;
    });
    setScaledIngredients(scaled.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Original Ingredients
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (one per line)&#10;Example:&#10;2 cups flour&#10;1 tsp salt"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 
                   focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                   transition-all duration-200"
          rows={5}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scale Factor
        </label>
        <select
          value={scaleFactor}
          onChange={(e) => setScaleFactor(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 
                   focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                   transition-all duration-200 bg-white"
        >
          <option value={0.5}>Half (½×)</option>
          <option value={1.5}>1.5×</option>
          <option value={2}>Double (2×)</option>
          <option value={3}>Triple (3×)</option>
          <option value={4}>Quadruple (4×)</option>
        </select>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={scaleRecipe}
        disabled={!ingredients.trim()}
        className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                 text-white rounded-lg font-medium shadow-md hover:shadow-lg 
                 transition-all duration-200 disabled:opacity-50"
      >
        Scale Recipe
      </motion.button>

      {scaledIngredients && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-orange-50 rounded-lg"
        >
          <h3 className="font-medium text-gray-800 mb-2">Scaled Recipe:</h3>
          <pre className="whitespace-pre-wrap text-gray-600">
            {scaledIngredients}
          </pre>
        </motion.div>
      )}
    </div>
  );
};

export default RecipeScaler;