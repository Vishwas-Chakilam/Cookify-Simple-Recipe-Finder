import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NutritionGoals = ({ goals, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [tempGoals, setTempGoals] = useState(goals);

  const handleSave = () => {
    onUpdate(tempGoals);
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Nutrition Goals</h2>
      {editing ? (
        <div className="space-y-4">
          {Object.entries(tempGoals).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  setTempGoals({ ...tempGoals, [key]: Number(e.target.value) })
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <dl className="space-y-2">
            {Object.entries(goals).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <dt className="text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </dt>
                <dd className="font-medium">{value}g</dd>
              </div>
            ))}
          </dl>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 text-orange-500 hover:text-orange-600"
          >
            Edit Goals
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NutritionGoals;
