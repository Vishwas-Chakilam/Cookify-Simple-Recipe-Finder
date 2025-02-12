import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMealStore = create(
  persist(
    (set, get) => ({
      savedMeals: [],
      dailyMeals: [],
      nutritionGoals: {
        calories: 2000,
        protein: 50,
        carbs: 250,
        fat: 70,
        fiber: 25,
        sugar: 50
      },

      addSavedMeal: (meal) => set(state => ({
        savedMeals: [...state.savedMeals, meal]
      })),

      addDailyMeal: (meal) => set(state => ({
        dailyMeals: [...state.dailyMeals, meal]
      })),

      getDailyTotals: () => {
        const { dailyMeals } = get();
        return dailyMeals.reduce((totals, meal) => ({
          calories: totals.calories + meal.nutrition.calories,
          protein: totals.protein + meal.nutrition.protein,
          carbs: totals.carbs + meal.nutrition.carbohydrates,
          fat: totals.fat + meal.nutrition.fat,
          fiber: totals.fiber + meal.nutrition.fiber,
          sugar: totals.sugar + meal.nutrition.sugar
        }), {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0
        });
      },

      clearDailyMeals: () => set({ dailyMeals: [] })
    }),
    {
      name: 'meal-storage'
    }
  )
);