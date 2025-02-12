import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NutritionConverter } from '../../../services/nutritionConverter';

const NutritionConverterTool = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('g');
  const [toUnit, setToUnit] = useState('oz');
  const [result, setResult] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const validConversions = {
    g: ['oz', 'cups', 'tbsp'],
    oz: ['g', 'cups', 'tbsp'],
    cups: ['g', 'oz', 'tbsp'],
    tbsp: ['g', 'oz', 'cups'],
  };

  const handleConvert = () => {
    setIsConverting(true);
    setTimeout(() => {
      try {
        if (!validConversions[fromUnit]?.includes(toUnit)) {
          setResult('Invalid conversion');
          return;
        }

        const converted = NutritionConverter.convert(
          Number(value),
          fromUnit,
          toUnit
        );
        setResult(converted.toFixed(2));
      } catch (error) {
        setResult('Invalid conversion');
      } finally {
        setIsConverting(false);
      }
    }, 300);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value to Convert
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 
                     focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder="Enter a number"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 
                       focus:ring-2 focus:ring-orange-200 transition-all duration-200 
                       bg-white appearance-none"
            >
              <option value="g">Grams (g)</option>
              <option value="oz">Ounces (oz)</option>
              <option value="cups">Cups</option>
              <option value="tbsp">Tablespoons</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 
                       focus:ring-2 focus:ring-orange-200 transition-all duration-200 
                       bg-white appearance-none"
            >
              <option value="g">Grams (g)</option>
              <option value="oz">Ounces (oz)</option>
              <option value="cups">Cups</option>
              <option value="tbsp">Tablespoons</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConvert}
          disabled={isConverting || !value}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                   text-white rounded-lg font-medium shadow-md hover:shadow-lg 
                   transition-all duration-200 disabled:opacity-50 
                   disabled:cursor-not-allowed"
        >
          {isConverting ? (
            <span className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Converting...
            </span>
          ) : (
            'Convert'
          )}
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-orange-50 rounded-lg"
          >
            <p className="text-center text-lg font-medium text-gray-800">
              {value} {fromUnit} = {result} {toUnit}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NutritionConverterTool;