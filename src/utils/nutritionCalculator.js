export const calculateDailyNutrition = (meals) => {
  return meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.nutrition.calories,
      protein: acc.protein + meal.nutrition.protein,
      carbs: acc.carbs + meal.nutrition.carbohydrates,
      fat: acc.fat + meal.nutrition.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

export const getNutritionProgress = (current, goals) => {
  return {
    calories: (current.calories / goals.calories) * 100,
    protein: (current.protein / goals.protein) * 100,
    carbs: (current.carbs / goals.carbs) * 100,
    fat: (current.fat / goals.fat) * 100,
  };
};
