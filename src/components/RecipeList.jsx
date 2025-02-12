import React from 'react';
import { motion } from 'framer-motion';
import RecipeCard from './Recipe/RecipeCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const RecipeList = ({ recipes }) => {
  if (!recipes.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recipes found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {recipes.map((recipe) => (
        <motion.div
          key={recipe.id}
          variants={item}
          layout
        >
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RecipeList;