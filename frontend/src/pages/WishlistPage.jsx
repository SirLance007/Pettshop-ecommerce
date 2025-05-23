import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaPaw, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { removeFromWishlist, clearWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.wishlist);
  const [isHovered, setIsHovered] = useState(false);
  const petEmojis = ['🐕', '🐈', '🐹', '🦜', '🐠', '🐇'];
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPetIndex((prev) => (prev + 1) % petEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRemoveFromWishlist = (e, productId) => {
    e.stopPropagation();
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      {/* Enhanced Interactive Heading */}
      <div 
        className="relative mb-8 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-pet-brown/20 rounded-full blur-lg animate-pulse"></div>
            <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
              <FaHeart className="text-white text-2xl transform transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-pet-brown tracking-tight flex items-center gap-2 relative">
              My Wishlist
              <span className="absolute -top-6 -right-6 text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {petEmojis[currentPetIndex]}
              </span>
            </h2>
            <p className="text-pet-brown/60 mt-1 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              Your favorite pet products in one place! 🐾
            </p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4">
            <FaHeart className="w-16 h-16 mx-auto text-pet-brown/30" />
          </div>
          <h3 className="text-xl font-medium text-pet-brown mb-2">Your wishlist is empty</h3>
          <p className="text-pet-brown/60 mb-6">Start adding your favorite items!</p>
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-2 bg-pet-brown text-white px-6 py-3 rounded-xl hover:bg-pet-brown/90 transition-all duration-300"
          >
            <FaPaw className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClearWishlist}
              className="flex items-center gap-2 px-4 py-2 text-pet-brown/70 hover:text-pet-brown transition-colors duration-300"
            >
              <FaTrash className="w-4 h-4" />
              Clear Wishlist
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-pet-brown/10 group cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
                  <img
                    src={product.image?.url || product.images?.[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="absolute bottom-2 left-2 bg-white/95 text-pet-brown text-xs px-3 py-1 rounded-full font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center gap-1">
                    <FaPaw className="w-3 h-3" /> View Details
                  </span>
                </div>
                <h3 className="font-bold text-pet-brown mb-2 truncate">{product.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-pet-brown/70 font-medium">${product.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleRemoveFromWishlist(e, product._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                    >
                      <FaHeart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="p-2 text-pet-brown hover:bg-pet-brown/10 rounded-lg transition-colors duration-300"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage; 