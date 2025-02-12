import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getSubstitutes } from '../../services/cuisineService';

const IngredientSubstitutes = ({ ingredient }) => {
  const [substitutes, setSubstitutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubstitutes = async () => {
    setLoading(true);
    try {
      const data = await getSubstitutes(ingredient);
      setSubstitutes(data.substitutes || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4"
    >
      <button
        onClick={fetchSubstitutes}
        disabled={loading}
        className="text-orange-500 hover:text-orange-600"
      >
        {loading ? 'Loading...' : 'Find Substitutes'}
      </button>
      
      {substitutes.length > 0 && (
        <ul className="mt-2 space-y-1">
          {substitutes.map((substitute, index) => (
            <li key={index} className="text-gray-700">{substitute}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};