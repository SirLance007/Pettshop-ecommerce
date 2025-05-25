import React, { useState, useEffect } from "react";
import { FaFilter, FaPaw } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import { useRef } from "react";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import { clearAllBrowserData } from '../utils/cacheUtils';
import { motion, AnimatePresence } from "framer-motion";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    // Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-white relative">
      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FaFilter className="text-base" />
            <span className="text-sm font-medium">Show Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Sidebar Container */}
      <div className="hidden lg:block lg:w-1/5 lg:min-w-[250px] pt-6">
        <div
          ref={sidebarRef}
          className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-200/50"
        >
          <FilterSidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[85%] max-w-[300px] bg-white border-r border-gray-200 overflow-y-auto shadow-xl"
            >
              <div className="sticky top-0 bg-white p-4 border-b border-gray-200/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaPaw className="text-pet-brown h-5 w-5" />
                  <span className="font-semibold text-pet-brown">Filter Options</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Products Section */}
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8 group px-4 sm:px-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-xl p-1.5 sm:p-2 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaPaw className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-center sm:text-left text-gray-900 tracking-tight drop-shadow-lg relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pet-brown to-pet-brown/80 whitespace-nowrap">
                Paw-some Collection
              </span>
              <motion.span
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-pet-brown to-pet-brown/80 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h2>
          </motion.div>
          
          {/* Sort Options */}
          <SortOptions />

          {/* Product Grid */}
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
