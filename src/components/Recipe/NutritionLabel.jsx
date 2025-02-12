import React from 'react';
import { motion } from 'framer-motion';

const NutritionLabel = ({ nutrition }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-bold mb-4 border-b-2 pb-2">Nutrition Facts</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between border-b py-1">
          <span>Calories</span>
          <span className="font-medium">{nutrition.calories}</span>
        </div>
        
        <div className="flex justify-between border-b py-1">
          <span>Total Fat</span>
          <span className="font-medium">{nutrition.fat}g</span>
        </div>
        
        <div className="flex justify-between border-b py-1">
          <span>Total Carbohydrates</span>
          <span className="font-medium">{nutrition.carbohydrates}g</span>
        </div>
        
        <div className="flex justify-between border-b py-1">
          <span>Protein</span>
          <span className="font-medium">{nutrition.protein}g</span>
        </div>
      </div>
    </motion.div>
  );
};