import React, { useState } from 'react';
import { FaShare } from 'react-icons/fa';

const ShareButton = ({ recipe }) => {
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: recipe.title,
      text: `Check out this recipe: ${recipe.title}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="p-2 rounded-full text-gray-500 hover:text-orange-500 transition-colors"
        aria-label="Share recipe"
      >
        <FaShare />
      </button>
      
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg">
          Link copied to clipboard!
        </div>
      )}
    </>
  );
};

export default ShareButton;