import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const DEFAULT_PLAN = {
  name: '',
  description: '',
  targetCalories: 2000,
  restrictions: [],
  mealsPerDay: 3,
  duration: 7,
};

const dietPlanStore = create(
  persist(
    (set, get) => ({
      version: 1, // Add version tracking
      plans: [],
      
      addPlan: (plan) => set(state => ({
        plans: [...state.plans, { 
          ...DEFAULT_PLAN,
          ...plan, 
          id: Date.now(),
          createdAt: new Date().toISOString(),
        }]
      })),
      
      removePlan: (planId) => set(state => ({
        plans: state.plans.filter(p => p.id !== planId)
      })),
      
      updatePlan: (planId, updates) => set(state => ({
        plans: state.plans.map(p => 
          p.id === planId ? { 
            ...p, 
            ...updates,
            updatedAt: new Date().toISOString(),
          } : p
        )
      })),
      
      getPlan: (planId) => get().plans.find(p => p.id === planId)
    }),
    {
      name: 'diet-plans-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return {
            ...persistedState,
            version: 1,
            plans: persistedState.plans.map(plan => ({
              ...DEFAULT_PLAN,
              ...plan,
              createdAt: plan.createdAt || new Date().toISOString(),
            }))
          };
        }
        return persistedState;
      },
    }
  )
);

export default dietPlanStore;