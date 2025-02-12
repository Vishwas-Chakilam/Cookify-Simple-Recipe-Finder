export const validateMeal = (meal) => {
  const errors = {};

  if (!meal.title.trim()) {
    errors.title = 'Title is required';
  } else if (meal.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (meal.nutrition.calories < 0) {
    errors.calories = 'Calories must be a positive number';
  }

  if (meal.nutrition.protein < 0) {
    errors.protein = 'Protein must be a positive number';
  }

  if (meal.nutrition.carbohydrates < 0) {
    errors.carbohydrates = 'Carbohydrates must be a positive number';
  }

  if (meal.nutrition.fat < 0) {
    errors.fat = 'Fat must be a positive number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};