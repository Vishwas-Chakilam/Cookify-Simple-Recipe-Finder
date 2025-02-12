// Calculate total daily nutrition from meals
export const calculateDailyNutrition = (meals) => {
  return meals.reduce((totals, meal) => ({
    calories: totals.calories + (meal.nutrition?.calories || 0),
    protein: totals.protein + (meal.nutrition?.protein || 0),
    carbs: totals.carbs + (meal.nutrition?.carbohydrates || 0),
    fat: totals.fat + (meal.nutrition?.fat || 0),
    fiber: totals.fiber + (meal.nutrition?.fiber || 0),
    sugar: totals.sugar + (meal.nutrition?.sugar || 0)
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  });
};

// Calculate percentage of daily goals met
export const calculateGoalProgress = (current, goals) => {
  return Object.keys(current).reduce((progress, nutrient) => ({
    ...progress,
    [nutrient]: (current[nutrient] / goals[nutrient]) * 100
  }), {});
};

// Calculate BMR (Basal Metabolic Rate)
export const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  }
  return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
};

// Calculate recommended macronutrient distribution
export const calculateMacroDistribution = (calories, ratio = 'balanced') => {
  const distributions = {
    balanced: { protein: 0.3, carbs: 0.4, fat: 0.3 },
    lowCarb: { protein: 0.4, carbs: 0.2, fat: 0.4 },
    highProtein: { protein: 0.4, carbs: 0.3, fat: 0.3 }
  };

  const { protein, carbs, fat } = distributions[ratio];
  return {
    protein: Math.round((calories * protein) / 4), // 4 calories per gram of protein
    carbs: Math.round((calories * carbs) / 4),     // 4 calories per gram of carbs
    fat: Math.round((calories * fat) / 9)          // 9 calories per gram of fat
  };
};