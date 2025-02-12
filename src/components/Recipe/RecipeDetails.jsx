import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaUtensils, FaUsers } from 'react-icons/fa';

const RecipeDetails = ({ recipe }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center">
          <FaClock className="text-orange-500 mr-2" />
          <span>{recipe.readyInMinutes} mins</span>
        </div>
        <div className="flex items-center">
          <FaUtensils className="text-orange-500 mr-2" />
          <span>{recipe.dishTypes?.join(', ')}</span>
        </div>
        <div className="flex items-center">
          <FaUsers className="text-orange-500 mr-2" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions?.split('.').map((step, index) => (
              step.trim() && (
                <li key={index} className="text-gray-700">{step.trim()}</li>
              )
            ))}
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Equipment Needed</h3>
          <ul className="list-disc list-inside">
            {recipe.equipment?.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  );
};