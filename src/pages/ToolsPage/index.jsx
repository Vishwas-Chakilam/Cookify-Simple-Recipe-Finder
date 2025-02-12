import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaExchangeAlt, 
  FaUtensils, 
  FaClock, 
  FaBalanceScale,
  FaRandom,
  FaChartLine 
} from 'react-icons/fa';
import NutritionConverterTool from './components/NutritionConverter';
import MealRecommender from './components/MealRecommender';
import CookingTimeCalculator from './components/CookingTimeCalculator';
import RecipeScaler from './components/RecipeScaler';
import SubstituteFinder from './components/SubstituteFinder';

const ToolsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cooking Tools & Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of helpful tools designed to make your cooking experience easier and more enjoyable
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nutrition Converter Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                  <FaExchangeAlt className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Nutrition Converter
                </h2>
              </div>
              <p className="text-gray-600">
                Convert between different units of measurement for ingredients and portion sizes
              </p>
            </div>
            <div className="p-6">
              <NutritionConverterTool />
            </div>
          </motion.div>

          {/* Meal Recommender Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                  <FaUtensils className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Meal Recommender
                </h2>
              </div>
              <p className="text-gray-600">
                Get personalized meal suggestions based on your nutritional preferences
              </p>
            </div>
            <div className="p-6">
              <MealRecommender />
            </div>
          </motion.div>

          {/* Cooking Time Calculator Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                  <FaClock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Cooking Time Calculator
                </h2>
              </div>
              <p className="text-gray-600">
                Calculate cooking times and temperatures for different types of meat
              </p>
            </div>
            <div className="p-6">
              <CookingTimeCalculator />
            </div>
          </motion.div>

          {/* Recipe Scaler Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                  <FaBalanceScale className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Recipe Scaler
                </h2>
              </div>
              <p className="text-gray-600">
                Scale recipe ingredients up or down for different serving sizes
              </p>
            </div>
            <div className="p-6">
              <RecipeScaler />
            </div>
          </motion.div>

          {/* Ingredient Substitute Finder Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                  <FaRandom className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Substitute Finder
                </h2>
              </div>
              <p className="text-gray-600">
                Find suitable substitutes for common cooking ingredients
              </p>
            </div>
            <div className="p-6">
              <SubstituteFinder />
            </div>
          </motion.div>
        </div>

        {/* Coming Soon Section */}
        <motion.div
          variants={itemVariants}
          className="text-center bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="inline-block p-4 bg-orange-100 text-orange-600 rounded-lg mb-4">
            <FaChartLine className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            More Tools Coming Soon
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're working on new tools to help you plan meals, track nutrition, and improve your cooking experience.
            Stay tuned for updates!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ToolsPage;