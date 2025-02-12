import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/dateFormatter';

const HistoryList = ({ searches, onSearchAgain }) => {
  if (searches.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No search history yet. Try searching for some recipes!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {searches.map((search) => (
        <div
          key={search.id}
          className="p-4 border-b border-gray-200 hover:bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{formatDate(search.date)}</p>
              <p className="text-gray-800 font-medium mt-1">
                Ingredients: {search.ingredients}
              </p>
            </div>
            <button
              onClick={() => onSearchAgain(search.ingredients)}
              className="px-4 py-2 text-blue-500 hover:text-blue-600 
                         hover:bg-blue-50 rounded-lg transition-colors"
            >
              Search Again
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HistoryList;
