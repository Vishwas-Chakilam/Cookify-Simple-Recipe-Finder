import React, { useState } from 'react';
import { motion } from 'framer-motion';

const commonSubstitutes = {
  'butter': [
    { item: 'Olive Oil', ratio: '3/4 cup for 1 cup butter' },
    { item: 'Greek Yogurt', ratio: '1:1 ratio' },
    { item: 'Applesauce', ratio: '1:1 ratio (in baking)' },
  ],
  'eggs': [
    { item: 'Mashed Banana', ratio: '1/4 cup for 1 egg' },
    { item: 'Ground Flaxseed', ratio: '1 tbsp + 3 tbsp water for 1 egg' },
    { item: 'Silken Tofu', ratio: '1/4 cup for 1 egg' },
  ],
  'milk': [
    { item: 'Almond Milk', ratio: '1:1 ratio' },
    { item: 'Soy Milk', ratio: '1:1 ratio' },
    { item: 'Oat Milk', ratio: '1:1 ratio' },
  ],
  'flour': [
    { item: 'Almond Flour', ratio: '1:1 ratio (may need more binding agent)' },
    { item: 'Coconut Flour', ratio: '1/4 cup for 1 cup flour' },
    { item: 'Oat Flour', ratio: '1:1 ratio' },
  ],
  'sugar': [
    { item: 'Honey', ratio: '3/4 cup for 1 cup sugar' },
    { item: 'Maple Syrup', ratio: '3/4 cup for 1 cup sugar' },
    { item: 'Stevia', ratio: '1 tsp for 1 cup sugar' },
  ],
};

const SubstituteFinder = () => {
  const [ingredient, setIngredient] = useState('');
  const [substitutes, setSubstitutes] = useState([]);
  const [showCustom, setShowCustom] = useState(false);

  const handleSearch = () => {
    const found = commonSubstitutes[ingredient.toLowerCase()];
    if (found) {
      setSubstitutes(found);
      setShowCustom(false);
    } else {
      setSubstitutes([]);
      setShowCustom(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredient to Replace
          </label>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                     focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                     transition-all duration-200"
            placeholder="Enter ingredient (e.g., butter, eggs)"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          disabled={!ingredient.trim()}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                   text-white rounded-lg font-medium shadow-md hover:shadow-lg 
                   transition-all duration-200 disabled:opacity-50"
        >
          Find Substitutes
        </motion.button>

        <AnimatePresence>
          {substitutes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-orange-50 rounded-lg"
            >
              <h3 className="font-medium text-gray-800 mb-3">
                Substitutes for {ingredient}:
              </h3>
              <ul className="space-y-2">
                {substitutes.map((sub, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <span className="font-medium">{sub.item}</span>
                    <span className="text-sm text-gray-600">{sub.ratio}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {showCustom && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-orange-50 rounded-lg text-center"
            >
              <p className="text-gray-600">
                No common substitutes found for "{ingredient}". Try searching for a different ingredient.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubstituteFinder;