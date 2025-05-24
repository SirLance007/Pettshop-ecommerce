import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import VoiceSearch from './VoiceSearch';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleVoiceSearchResult = (transcript) => {
    setSearchTerm(transcript);
    navigate(`/search?q=${encodeURIComponent(transcript.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-300"
          aria-label="Search"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600
                   dark:hover:text-gray-300 transition-colors duration-300"
          aria-label="Submit search"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>
      <VoiceSearch onSearchResult={handleVoiceSearchResult} />
    </form>
  );
};

export default SearchBar; 