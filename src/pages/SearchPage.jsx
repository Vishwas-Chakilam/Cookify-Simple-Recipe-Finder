import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RecipeList from '../components/RecipeList';
import LoadingSpinner from '../components/LoadingSpinner';
import PageTransition from '../components/PageTransition';
import { searchRecipes } from '../services/recipeService';
import { applyFilters } from '../utils/filters';
import { saveSearch } from '../utils/historyStorage';

function SearchPage() {
  const location = useLocation();
  const [searchMode, setSearchMode] = useState('ingredients');
  const [query, setQuery] = useState(location.state?.query || '');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    highProtein: false,
  });

  const searchRecipesByQuery = async () => {
    if (!query.trim()) {
      setError('Please enter ' + (searchMode === 'ingredients' ? 'ingredients' : 'a recipe name'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Search parameters
      const searchParams = {
        query: query,
        number: 12, // Number of results to return
        addRecipeInformation: true,
        fillIngredients: true,
        cuisine: query.toLowerCase(), // Add cuisine parameter for cuisine-based searches
      };

      const response = await searchRecipes(searchParams);
      const filteredRecipes = applyFilters(response.results || [], filters);
      setRecipes(filteredRecipes);
      saveSearch(query, searchMode);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe Search</h1>
            <p className="text-gray-600 mb-8">
              {searchMode === 'ingredients'
                ? 'Enter ingredients you have and discover delicious recipes'
                : 'Search for recipes by name or cuisine'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-6"
          >
            <SearchBar
              mode={searchMode}
              ingredients={query}
              setIngredients={setQuery}
              onSearch={searchRecipesByQuery}
              onModeChange={setSearchMode}
            />
            
            <Filters
              filters={filters}
              setFilters={setFilters}
              onReset={() => setFilters({
                vegetarian: false,
                vegan: false,
                glutenFree: false,
                highProtein: false,
              })}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default SearchPage;