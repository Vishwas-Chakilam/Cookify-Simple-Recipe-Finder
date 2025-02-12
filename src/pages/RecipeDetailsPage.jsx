import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRecipeDetails } from '../services/recipeService';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import PageTransition from '../components/PageTransition';
import { FaClock, FaUtensils, FaUsers } from 'react-icons/fa';
import FavoriteButton from '../components/Recipe/FavoriteButton';
import ShareButton from '../components/Recipe/ShareButton';
import { useFavorite } from '../components/Recipe/hooks/useFavorite';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, handleFavoriteToggle } = useFavorite(id);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (recipe) {
      handleFavoriteToggle(recipe);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!recipe) return <ErrorState message="Recipe not found" />;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <FavoriteButton 
                  isFavorite={isFavorite} 
                  onClick={handleFavoriteClick}
                />
                <ShareButton recipe={recipe} />
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {recipe.title}
              </h1>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{recipe.readyInMinutes} mins</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-2" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUtensils className="mr-2" />
                  <span>{recipe.dishTypes?.[0] || 'Main Course'}</span>
                </div>
              </div>

              {recipe.diets?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Dietary Info</h2>
                  <div className="flex flex-wrap gap-2">
                    {recipe.diets.map((diet) => (
                      <span
                        key={diet}
                        className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside space-y-2">
                  {recipe.extendedIngredients?.map((ingredient) => (
                    <li key={ingredient.id} className="text-gray-700">
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                <ol className="list-decimal list-inside space-y-4">
                  {recipe.analyzedInstructions?.[0]?.steps.map((step) => (
                    <li key={step.number} className="text-gray-700">
                      {step.step}
                    </li>
                  ))}
                </ol>
              </div>

              {recipe.nutrition && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Nutrition Facts</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Calories</p>
                      <p className="text-lg font-semibold">
                        {recipe.nutrition.nutrients.find(n => n.name === 'Calories')?.amount || 0}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Protein</p>
                      <p className="text-lg font-semibold">
                        {recipe.nutrition.nutrients.find(n => n.name === 'Protein')?.amount || 0}g
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Carbs</p>
                      <p className="text-lg font-semibold">
                        {recipe.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0}g
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Fat</p>
                      <p className="text-lg font-semibold">
                        {recipe.nutrition.nutrients.find(n => n.name === 'Fat')?.amount || 0}g
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default RecipeDetailsPage;