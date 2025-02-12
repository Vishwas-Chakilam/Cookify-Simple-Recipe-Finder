import React from 'react';

const DIETARY_OPTIONS = [
  { id: 'gluten-free', label: 'Gluten Free' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'keto', label: 'Keto' }
];

const DietaryFilters = ({ selectedDiets, onChange }) => {
  const handleDietChange = (dietId) => {
    const newDiets = selectedDiets.includes(dietId)
      ? selectedDiets.filter(d => d !== dietId)
      : [...selectedDiets, dietId];
    onChange(newDiets);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Dietary Restrictions</h3>
      <div className="flex flex-wrap gap-2">
        {DIETARY_OPTIONS.map(({ id, label }) => (
          <label key={id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedDiets.includes(id)}
              onChange={() => handleDietChange(id)}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DietaryFilters;