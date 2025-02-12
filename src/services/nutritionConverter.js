import { convertMeasurement } from '../utils/measurementConverter';

export const NutritionConverter = {
  // Convert between different measurement units
  convert: (value, fromUnit, toUnit) => {
    return convertMeasurement(value, fromUnit, toUnit);
  },

  // Standard portion sizes
  standardPortions: {
    cup: 240, // ml
    tablespoon: 15, // ml
    teaspoon: 5, // ml
    ounce: 28.35, // g
    pound: 453.59, // g
  },

  // Convert common household measurements to grams
  toGrams: (value, unit) => {
    const conversions = {
      cup: (v) => v * 240,
      tbsp: (v) => v * 15,
      tsp: (v) => v * 5,
      oz: (v) => v * 28.35,
      lb: (v) => v * 453.59,
      g: (v) => v,
    };
    return conversions[unit]?.(value) ?? value;
  }
};