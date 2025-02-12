import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CookingTimeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [meatType, setMeatType] = useState('chicken');
  const [doneness, setDoneness] = useState('medium');
  const [result, setResult] = useState(null);

  const calculateTime = () => {
    const baseTimePerPound = {
      chicken: { any: 20 },
      beef: {
        rare: 15,
        medium: 20,
        welldone: 25
      },
      pork: {
        medium: 25,
        welldone: 30
      },
      fish: { any: 10 }
    };

    const time = meatType === 'chicken' || meatType === 'fish'
      ? baseTimePerPound[meatType].any * weight
      : baseTimePerPound[meatType][doneness] * weight;

    setResult({
      minutes: Math.round(time),
      temperature: getRecommendedTemp(meatType, doneness)
    });
  };

  const getRecommendedTemp = (meat, done) => {
    const temps = {
      chicken: '165°F (74°C)',
      beef: {
        rare: '125°F (52°C)',
        medium: '145°F (63°C)',
        welldone: '160°F (71°C)'
      },
      pork: {
        medium: '145°F (63°C)',
        welldone: '160°F (71°C)'
      },
      fish: '145°F (63°C)'
    };

    return meat === 'chicken' || meat === 'fish'
      ? temps[meat]
      : temps[meat][done];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                     focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                     transition-all duration-200"
            placeholder="Enter weight in pounds"
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meat Type
          </label>
          <select
            value={meatType}
            onChange={(e) => setMeatType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                     focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                     transition-all duration-200 bg-white"
          >
            <option value="chicken">Chicken</option>
            <option value="beef">Beef</option>
            <option value="pork">Pork</option>
            <option value="fish">Fish</option>
          </select>
        </div>

        {(meatType === 'beef' || meatType === 'pork') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doneness
            </label>
            <select
              value={doneness}
              onChange={(e) => setDoneness(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                       transition-all duration-200 bg-white"
            >
              {meatType === 'beef' && <option value="rare">Rare</option>}
              <option value="medium">Medium</option>
              <option value="welldone">Well Done</option>
            </select>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calculateTime}
          disabled={!weight}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                   text-white rounded-lg font-medium shadow-md hover:shadow-lg 
                   transition-all duration-200 disabled:opacity-50"
        >
          Calculate Time
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-orange-50 rounded-lg space-y-2"
          >
            <p className="text-center font-medium text-gray-800">
              Cooking Time: {result.minutes} minutes
            </p>
            <p className="text-center text-sm text-gray-600">
              Target Temperature: {result.temperature}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CookingTimeCalculator;