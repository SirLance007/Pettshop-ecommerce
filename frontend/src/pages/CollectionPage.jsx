import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import { useRef } from "react";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import { clearAllBrowserData } from '../utils/cacheUtils';

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 border p-3 flex justify-center items-center gap-2 bg-white rounded-xl shadow-md text-gray-700 font-semibold hover:bg-gray-100 transition-all"
      >
        <FaFilter className="mr-2 text-lg" />
        Filters
      </button>

      {/* Filter Sidebar Container */}
      <div className="hidden lg:block lg:w-1/5 lg:min-w-[250px]">
        {/* Sticky Sidebar */}
        <div
          ref={sidebarRef}
          className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-200/50"
        >
          <FilterSidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`lg:hidden fixed inset-y-0 z-40 left-0 w-[280px] max-w-xs bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 transform
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    shadow-xl`}
      >
        <FilterSidebar />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Products Section */}
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold uppercase mb-8 text-gray-900 tracking-tight drop-shadow-lg">
            All Collections
          </h2>
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
