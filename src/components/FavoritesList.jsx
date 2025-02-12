import React from 'react';
import { motion } from 'framer-motion';
import RecipeCard from './Recipe/RecipeCard';

const FavoritesList = ({ favorites }) => {
  if (!favorites.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No favorite recipes yet. Click the star icon on recipes to add them to your favorites!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map(recipe => (
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
    </div>
  );
};