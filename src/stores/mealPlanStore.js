import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_NUTRITION_GOALS = {
  calories: 2000,
  protein: 50,
  carbs: 250,
  fat: 70,
};

const DEFAULT_MEAL_PLAN = {
  meals: []
};

/** @type {import('zustand').StateCreator<MealPlanStore>} */
const createMealPlanStore = (set, get) => ({
  mealPlan: DEFAULT_MEAL_PLAN,
  nutritionGoals: DEFAULT_NUTRITION_GOALS,
  
  setMealPlan: (plan) => set({ 
    mealPlan: plan || DEFAULT_MEAL_PLAN 
  }),
  
  addMeal: (meal) => set(state => ({
    mealPlan: {
      ...state.mealPlan || DEFAULT_MEAL_PLAN,
      meals: [...(state.mealPlan?.meals || []), meal]
    }
  })),
  
  removeMeal: (mealId) => set(state => ({
    mealPlan: {
      ...state.mealPlan || DEFAULT_MEAL_PLAN,
      meals: state.mealPlan?.meals?.filter(meal => meal.id !== mealId) || []
    }
  })),
  
  updateNutritionGoals: (goals) => {
    const validatedGoals = Object.entries(goals).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: Math.max(0, Number(value) || DEFAULT_NUTRITION_GOALS[key])
    }), {});
    
    set({ nutritionGoals: validatedGoals });
  },
  
  getDailyProgress: () => {
    const { mealPlan } = get();
    if (!mealPlan?.meals?.length) return null;
    
    return mealPlan.meals.reduce((acc, meal) => ({
      calories: acc.calories + (meal.nutrition?.calories || 0),
      protein: acc.protein + (meal.nutrition?.protein || 0),
      carbs: acc.carbs + (meal.nutrition?.carbohydrates || 0),
      fat: acc.fat + (meal.nutrition?.fat || 0),
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    });
  },
  
  clearMealPlan: () => set({ 
    mealPlan: DEFAULT_MEAL_PLAN 
  }),
});

const useMealPlanStore = create(
  persist(
    createMealPlanStore,
    {
      name: 'meal-plan-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useMealPlanStore;