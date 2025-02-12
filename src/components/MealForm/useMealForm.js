import { useState } from 'react';
import { analyzeMealQuery } from '../../services/nutritionAPI';
import { validateMeal } from '../../utils/validation';
import { useMealStorage } from '../../hooks/useMealStorage';

const initialMeal = {
  title: '',
  nutrition: { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }
};

export const useMealForm = (onAddMeal) => {
  const [meal, setMeal] = useMealStorage(initialMeal);
  const [isCustomMeal, setIsCustomMeal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in meal.nutrition) {
      setMeal(prev => ({
        ...prev,
        nutrition: { ...prev.nutrition, [name]: Number(value) || 0 }
      }));
    } else {
      setMeal(prev => ({ ...prev, [name]: value }));
    }
    // Clear error for the changed field
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFetchNutrition = async () => {
    if (!meal.title.trim()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const nutrition = await analyzeMealQuery(meal.title);
      setMeal(prev => ({ ...prev, nutrition }));
    } catch (error) {
      setErrors({ api: 'Failed to fetch nutrition data. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateMeal(meal);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onAddMeal({
      ...meal,
      id: Date.now().toString(),
      date: new Date().toISOString()
    });
    
    setMeal(initialMeal);
    setErrors({});
  };

  const toggleCustomMeal = () => {
    setIsCustomMeal(prev => !prev);
    setMeal(initialMeal);
    setErrors({});
  };

  return {
    meal,
    isCustomMeal,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
    toggleCustomMeal,
    handleFetchNutrition
  };
};