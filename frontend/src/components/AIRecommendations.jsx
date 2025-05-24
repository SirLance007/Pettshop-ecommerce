import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AIRecommendations = ({ currentProductId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userHistory = useSelector(state => state.user.purchaseHistory);
  const userPreferences = useSelector(state => state.user.preferences);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/recommendations', {
          currentProductId,
          userHistory,
          userPreferences,
          limit: 4
        });
        
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentProductId) {
      fetchRecommendations();
    }
  }, [currentProductId, userHistory, userPreferences]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <section 
      className="mt-8"
      aria-labelledby="recommendations-heading"
    >
      <h2 
        id="recommendations-heading"
        className="text-xl font-semibold mb-4"
      >
        Recommended for You
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <article 
            key={product._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
                     transform transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover"
              loading="lazy"
            />
            
            <div className="p-4">
              <h3 className="font-medium text-sm mb-2">{product.name}</h3>
              <p className="text-blue-600 dark:text-blue-400">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                  {Math.round(product.matchScore * 100)}% Match
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AIRecommendations; 