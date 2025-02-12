import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaTrash, FaHeart, FaSearch, FaFilter } from 'react-icons/fa';
import { 
  getSearchHistory, 
  clearHistory, 
  getFavorites,
  clearFavorites 
} from '../utils/historyStorage';
import Pagination from '../components/Pagination';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const ITEMS_PER_PAGE = 6;

const HistoryPage = () => {
  const [searches, setSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('history');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setSearches(getSearchHistory());
      setFavorites(getFavorites());
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAgain = (search) => {
    navigate('/search', { 
      state: { 
        query: search.query, 
        mode: search.mode 
      } 
    });
  };

  const handleClearHistory = () => {
    clearHistory();
    setSearches([]);
  };

  const handleClearFavorites = () => {
    clearFavorites();
    setFavorites([]);
  };

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const filterAndSortFavorites = () => {
    let filtered = [...favorites];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.addedAt) - new Date(a.addedAt);
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadData} />;

  const filteredFavorites = filterAndSortFavorites();
  const totalPages = Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE);
  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">History & Favorites</h1>
          {activeTab === 'history' && searches.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center px-4 py-2 text-red-500 hover:text-red-600 
                       hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaTrash className="mr-2" />
              Clear History
            </button>
          )}
          {activeTab === 'favorites' && favorites.length > 0 && (
            <button
              onClick={handleClearFavorites}
              className="flex items-center px-4 py-2 text-red-500 hover:text-red-600 
                       hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaTrash className="mr-2" />
              Clear Favorites
            </button>
          )}
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center px-6 py-3 border-b-2 ${
              activeTab === 'history'
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaHistory className="mr-2" />
            Search History
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center px-6 py-3 border-b-2 ${
              activeTab === 'favorites'
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaHeart className="mr-2" />
            Favorites
          </button>
        </div>

        {activeTab === 'favorites' && (
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'history' ? (
          <div className="space-y-4">
            {searches.map((search) => (
              <div
                key={search.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(search.date).toLocaleDateString()} - 
                      {search.mode === 'ingredients' ? ' Ingredients Search' : ' Recipe Search'}
                    </p>
                    <p className="text-gray-800 font-medium mt-1">
                      {search.query}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSearchAgain(search)}
                    className="px-4 py-2 text-orange-500 hover:text-orange-600 
                             hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    Search Again
                  </button>
                </div>
              </div>
            ))}
            {searches.length === 0 && (
              <p className="text-center text-gray-500">No search history yet</p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedFavorites.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                  onClick={() => handleViewRecipe(recipe.id)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{recipe.title}</h3>
                    <p className="text-sm text-gray-500">
                      Added on {new Date(recipe.addedAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewRecipe(recipe.id);
                      }}
                      className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white 
                               rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filteredFavorites.length === 0 && (
              <p className="text-center text-gray-500">
                {searchTerm ? 'No matching favorites found' : 'No favorite recipes yet'}
              </p>
            )}
            {filteredFavorites.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;