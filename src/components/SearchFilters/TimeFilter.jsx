import React from 'react';

const TIME_OPTIONS = [
  { value: '', label: 'Any Time' },
  { value: '15', label: '15 minutes or less' },
  { value: '30', label: '30 minutes or less' },
  { value: '60', label: '1 hour or less' }
];

const TimeFilter = ({ value, onChange }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Cooking Time</h3>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
    >
      {TIME_OPTIONS.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default TimeFilter;