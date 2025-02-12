import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useFavorite } from './hooks/useFavorite';

const RecipeCard = ({ recipe }) => {
  const { isFavorite, handleFavoriteToggle } = useFavorite(recipe.id);
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    handleFavoriteToggle(recipe);
  };

  const handleViewRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleViewRecipe}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton 
            isFavorite={isFavorite} 
            onClick={handleFavoriteClick}
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">{recipe.title}</h3>
        
        {recipe.usedIngredients?.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Available Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {recipe.usedIngredients.map((ingredient, index) => (
                <span 
                  key={`${ingredient.id || ingredient.name}-${index}`}
                  className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded"
                >
                  {ingredient.name || ingredient.original}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {recipe.missedIngredients?.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Missing Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {recipe.missedIngredients.map((ingredient, index) => (
                <span 
                  key={`${ingredient.id || ingredient.name}-${index}`}
                  className="text-sm text-gray-600 bg-red-100 px-2 py-1 rounded"
                >
                  {ingredient.name || ingredient.original}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.dietaryTags?.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleViewRecipe}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg 
                   hover:bg-orange-600 transition-colors text-center"
        >
          View Recipe
        </button>
      </div>
    </motion.div>
  );
};

export default RecipeCard;