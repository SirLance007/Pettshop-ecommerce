import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaBone, FaShoppingCart, FaHeart } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";

const ProductGrid = ({ products, loading, error }) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-pet-brown text-xl animate-bounce flex items-center gap-2">
        Loading <FaPaw className="animate-spin" />
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-red-500 text-xl flex items-center gap-2">
        Error: {error} <span className="animate-bounce">😿</span>
      </div>
    </div>
  );

  if (!products || products.length === 0) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-pet-brown text-xl flex flex-col items-center gap-4">
        <MdPets className="w-16 h-16 animate-bounce" />
        <p>No products found</p>
      </div>
    </div>
  );

  return (
    <div className="sm:mx-0 md:mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => {
        const imageUrl = product.image?.url || product.images?.[0]?.url || "";
        const imageAlt = product.image?.alt || product.images?.[0]?.alt || product.name || "";
        const isInWishlist = wishlistItems.some(item => item._id === product._id);
        
        return (
          <div key={index} className="group relative">
          <Link
            to={`/product/${product.id || product._id}`}
              className="block"
          >
            <div className="bg-white/95 p-4 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-pet-brown/10 group-hover:border-pet-brown/30 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <FaPaw className="absolute top-2 right-2 text-pet-brown/10 w-6 h-6 animate-float" />
                <FaBone className="absolute bottom-2 left-2 text-pet-brown/10 w-4 h-4 animate-float delay-100" />
                <FaPaw className="absolute top-1/2 right-4 text-pet-brown/10 w-3 h-3 animate-float delay-200" />
              </div>

              {/* Image Container */}
              <div className="w-full aspect-[4/5] mb-4 overflow-hidden rounded-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  className="w-full h-full object-cover rounded-2xl transform transition-all duration-500 group-hover:scale-110"
                  src={imageUrl}
                  alt={imageAlt}
                />
                <div className="absolute inset-0 bg-pet-brown/20 rounded-2xl transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col relative z-10">
                <h3
                  className="mb-1 text-base font-bold text-pet-brown truncate group-hover:text-pet-brown/80 transition-colors duration-300"
                  title={product.name}
                >
                  {product.name}
                </h3>

                <p className="text-pet-brown/60 font-medium text-sm tracking-tight mb-4 flex items-center gap-2">
                  {product.discountPrice && product.discountPrice < product.price ? (
                    <>
                      <span className="text-pet-brown/40 line-through">
                        ${product.price}
                      </span>
                      <span className="text-pet-brown font-bold bg-pet-beige/20 px-2 py-0.5 rounded-full">
                        ${product.discountPrice}
                      </span>
                      <span className="text-xs bg-pet-brown/10 text-pet-brown px-2 py-0.5 rounded-full ml-auto">
                        Sale
                      </span>
                    </>
                  ) : (
                    <span className="text-pet-brown font-bold bg-pet-beige/20 px-2 py-0.5 rounded-full">
                      ${product.price}
                    </span>
                  )}
                </p>
              </div>

              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pet-beige/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
            </div>
          </Link>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle(product);
              }}
              className={`absolute top-6 right-6 z-20 p-2 rounded-full shadow-lg transition-all duration-300 transform
                ${isInWishlist 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white/90 text-pet-brown/60 hover:text-red-500 hover:bg-white'}`}
            >
              <FaHeart className={`w-5 h-5 ${isInWishlist ? 'animate-heartbeat' : ''}`} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
