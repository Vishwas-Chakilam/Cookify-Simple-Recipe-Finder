import React from 'react';
import { motion } from 'framer-motion';
import DietaryRestrictions from './DietaryRestrictions';
import MealFrequency from './MealFrequency';
import NutritionGoals from './NutritionGoals';

const DietPlanForm = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    targetCalories: 2000,
    restrictions: [],
    mealsPerDay: 3,
    duration: 7,
    ...initialValues
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Diet Plan Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          required
        />
        
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          rows={3}
        />
      </div>

      <NutritionGoals
        calories={formData.targetCalories}
        onChange={(calories) => handleChange('targetCalories', calories)}
      />

      <DietaryRestrictions
        selected={formData.restrictions}
        onChange={(restrictions) => handleChange('restrictions', restrictions)}
      />

      <MealFrequency
        mealsPerDay={formData.mealsPerDay}
        duration={formData.duration}
        onMealsChange={(meals) => handleChange('mealsPerDay', meals)}
        onDurationChange={(days) => handleChange('duration', days)}
      />

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
      >
        Create Diet Plan
      </button>
    </motion.form>
  );
};