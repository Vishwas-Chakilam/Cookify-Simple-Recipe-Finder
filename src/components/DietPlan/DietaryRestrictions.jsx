import React from 'react';

const RESTRICTIONS = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten Free' },
  { id: 'dairy-free', label: 'Dairy Free' },
  { id: 'nut-free', label: 'Nut Free' }
];

const DietaryRestrictions = ({ selected, onChange }) => (
  <div className="space-y-2">
    <h3 className="font-medium text-gray-700">Dietary Restrictions</h3>
    <div className="flex flex-wrap gap-2">
      {RESTRICTIONS.map(({ id, label }) => (
        <label key={id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(id)}
            onChange={() => {
              const newSelected = selected.includes(id)
                ? selected.filter(r => r !== id)
                : [...selected, id];
              onChange(newSelected);
            }}
            className="rounded text-orange-500 focus:ring-orange-500"
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  </div>
);