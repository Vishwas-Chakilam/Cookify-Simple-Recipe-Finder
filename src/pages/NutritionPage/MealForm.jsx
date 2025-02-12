import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MealFormInput from './components/MealFormInput';

const DEFAULT_MEAL = {
  id: '',
  title: '',
  nutrition: {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0
  }
};

const MealForm = ({ onAddMeal }) => {
  const [meal, setMeal] = useState(DEFAULT_MEAL);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMeal({
      ...meal,
      id: Date.now().toString(),
      date: new Date().toISOString()
    });
    setMeal(DEFAULT_MEAL);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in meal.nutrition) {
      setMeal({
        ...meal,
        nutrition: { ...meal.nutrition, [name]: Number(value) || 0 }
      });
    } else {
      setMeal({ ...meal, [name]: value });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <MealFormInput
          label="Meal Name"
          name="title"
          value={meal.title}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MealFormInput
            label="Calories"
            name="calories"
            value={meal.nutrition.calories}
            onChange={handleChange}
            type="number"
          />
          <MealFormInput
            label="Protein (g)"
            name="protein"
            value={meal.nutrition.protein}
            onChange={handleChange}
            type="number"
          />
          <MealFormInput
            label="Carbohydrates (g)"
            name="carbohydrates"
            value={meal.nutrition.carbohydrates}
            onChange={handleChange}
            type="number"
          />
          <MealFormInput
            label="Fat (g)"
            name="fat"
            value={meal.nutrition.fat}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Add Meal
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MealForm;