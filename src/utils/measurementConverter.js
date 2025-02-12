const conversions = {
  volume: {
    ml: {
      cups: 0.00422675,
      tbsp: 0.067628,
      tsp: 0.202884,
    },
    cups: {
      ml: 236.588,
      tbsp: 16,
      tsp: 48,
    },
  },
  weight: {
    g: {
      oz: 0.035274,
      lb: 0.00220462,
    },
    oz: {
      g: 28.3495,
      lb: 0.0625,
    },
  },
};

export const convertMeasurement = (value, fromUnit, toUnit) => {
  const category = Object.keys(conversions).find(
    (cat) => fromUnit in conversions[cat] && toUnit in conversions[cat][fromUnit]
  );

  if (!category) {
    throw new Error('Invalid conversion units');
  }

  return value * conversions[category][fromUnit][toUnit];
};