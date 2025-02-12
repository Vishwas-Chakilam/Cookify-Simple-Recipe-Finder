import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const IngredientList = ({ ingredients, onRemove, onUpdateAmount }) => {
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {ingredients.map((ingredient) => (
          <motion.div
            key={ingredient.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center gap-4 p-2 bg-gray-50 rounded-md"
          >
            <div className="flex-1">
              <p className="font-medium">{ingredient.name}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={ingredient.amount}
                  onChange={(e) => onUpdateAmount(ingredient.id, e.target.value)}
                  className="w-20 px-2 py-1 rounded border-gray-300"
                  min="0"
                  step="0.1"
                />
                <select
                  value={ingredient.unit}
                  onChange={(e) => onUpdateAmount(ingredient.id, ingredient.amount, e.target.value)}
                  className="px-2 py-1 rounded border-gray-300"
                >
                  <option value="g">grams</option>
                  <option value="oz">ounces</option>
                  <option value="cup">cups</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => onRemove(ingredient.id)}
              className="p-2 text-red-500 hover:text-red-600"
            >
              <FaTrash />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};