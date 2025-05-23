import React, { useState, useEffect } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ autoFocus = false, isMobile = false, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(autoFocus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = React.useRef(null);

  useEffect(() => {
    if ((autoFocus || isOpen) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, isOpen]);

  const handleSearchToggle = () => {
    if (!autoFocus) {
      setIsOpen(!isOpen);
      if (isOpen && onClose) {
        onClose();
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setSearchTerm("");
    handleSearchToggle();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleSearchToggle();
    }
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for pet products..."
            className="w-full bg-pet-beige/20 text-pet-brown placeholder:text-pet-brown/50 px-5 py-3 pr-12 rounded-xl border border-pet-brown/10 focus:border-pet-brown/30 focus:ring-2 focus:ring-pet-brown/20 outline-none transition-all duration-300"
            autoFocus={autoFocus}
          />
          <button
            type="submit"
            className="absolute right-2 p-2 text-pet-brown hover:text-pet-brown/70 transition-colors duration-300"
          >
            <HiMagnifyingGlass className="w-5 h-5" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={`relative ${isOpen ? 'w-full' : 'w-auto'}`}>
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center w-full">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for pet products..."
            className="w-full bg-pet-beige/20 text-pet-brown placeholder:text-pet-brown/50 pl-5 pr-20 py-2.5 rounded-full border border-pet-brown/10 focus:border-pet-brown/30 focus:ring-2 focus:ring-pet-brown/20 outline-none transition-all duration-300"
            autoFocus
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              type="submit"
              className="p-1.5 text-pet-brown hover:text-pet-brown/70 transition-colors duration-300"
            >
              <HiMagnifyingGlass className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleSearchToggle}
              className="p-1.5 text-pet-brown hover:text-pet-brown/70 transition-colors duration-300"
            >
              <HiMiniXMark className="w-5 h-5" />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="p-2 text-pet-brown hover:text-pet-brown/70 transition-colors duration-300 group"
        >
          <HiMagnifyingGlass className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
