import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { FaPaw, FaBone, FaShoppingCart, FaMinus, FaPlus, FaHeart } from "react-icons/fa";
import { MdPets, MdLocalShipping } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [mainImage, setmainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);
  const location = useLocation();

  const productFetchId = productId || id;
  const isInWishlist = wishlistItems.some(item => item._id === selectedProduct?._id);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images && selectedProduct.images.length > 0) {
      setmainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully.", {
          duration: 1000,
        });
      })
      .finally(() => setIsButtonDisabled(false));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(selectedProduct._id));
      toast.success("Removed from wishlist", { duration: 1000 });
    } else {
      dispatch(addToWishlist(selectedProduct));
      toast.success("Added to wishlist", { duration: 1000 });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="text-pet-brown text-xl animate-bounce flex items-center gap-2">
        Loading <FaPaw className="animate-spin" />
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="text-red-500 text-xl flex items-center gap-2">
        Error: {error} <span className="animate-bounce">😿</span>
      </div>
    </div>
  );

  if (!selectedProduct) return null;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {(location.pathname === "/" || location.pathname === "/home") && (
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-pet-brown tracking-tight flex items-center justify-center gap-4">
            <FaPaw className="w-8 h-8 animate-bounce-gentle" />
            Featured Product
            <FaPaw className="w-8 h-8 animate-bounce-gentle delay-100" />
          </h2>
        )}

        <div className="bg-white/95 rounded-3xl shadow-2xl border border-pet-brown/20 p-6 sm:p-10 relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <FaPaw className="absolute top-4 right-4 text-pet-brown/10 w-8 h-8 animate-float" />
            <FaBone className="absolute bottom-4 left-4 text-pet-brown/10 w-6 h-6 animate-float delay-100" />
            <FaPaw className="absolute top-1/2 left-8 text-pet-brown/10 w-4 h-4 animate-float delay-200" />
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start relative z-10">
            {/* Left Side - Images */}
            <div className="lg:w-1/2 space-y-6">
              {/* Main Image */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-pet-brown/20 rounded-2xl transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"></div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setmainImage(image.url)}
                    className={`relative group flex-shrink-0 ${
                      mainImage === image.url ? 'ring-2 ring-pet-brown' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-pet-brown/20 rounded-xl transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"></div>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-20 h-20 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="lg:w-1/2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-pet-brown">
                  {selectedProduct.name}
                </h1>

                <div className="flex items-center gap-3">
                  {selectedProduct.discountPrice && selectedProduct.discountPrice < selectedProduct.price ? (
                    <>
                      <span className="text-pet-brown/40 line-through text-lg">
                        ${selectedProduct.price}
                      </span>
                      <span className="text-2xl font-bold text-pet-brown">
                        ${selectedProduct.discountPrice}
                      </span>
                      <span className="bg-pet-brown/10 text-pet-brown px-3 py-1 rounded-full text-sm font-bold">
                        Sale
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-pet-brown">
                      ${selectedProduct.price}
                    </span>
                  )}
                </div>

                <p className="text-pet-brown/70 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Size Selection */}
                <div className="space-y-3">
                  <label className="block text-pet-brown font-medium flex items-center gap-2">
                    <FaPaw className="w-4 h-4 text-pet-brown/70" />
                    Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative group overflow-hidden px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-gradient-to-br from-pet-brown to-pet-brown/80 text-white shadow-lg scale-105'
                            : 'bg-pet-beige/20 text-pet-brown hover:bg-pet-beige/30'
                        }`}
                      >
                        {/* Background Paw Print */}
                        <FaPaw className={`absolute -right-2 -bottom-2 w-8 h-8 transition-all duration-300 ${
                          selectedSize === size
                            ? 'text-white/20 rotate-12'
                            : 'text-pet-brown/10 rotate-0'
                        }`} />
                        
                        {/* Size Text */}
                        <span className="relative z-10 font-bold tracking-wide">
                          {size}
                        </span>

                        {/* Hover Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-pet-brown/0 via-pet-brown/5 to-transparent transition-opacity duration-300 ${
                          selectedSize === size ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-3">
                  <label className="block text-pet-brown font-medium flex items-center gap-2">
                    <FaBone className="w-4 h-4 text-pet-brown/70" />
                    Color
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative flex flex-col items-center gap-2 transition-all duration-300`}
                      >
                        {/* Color Circle */}
                        <div className={`w-12 h-12 rounded-full shadow-md transition-all duration-300 relative overflow-hidden
                          ${selectedColor === color 
                            ? 'ring-2 ring-pet-brown ring-offset-2 scale-110' 
                            : 'hover:scale-105'
                          }`}
                        >
                          {/* Color Display */}
                          <div className="absolute inset-0" style={{ backgroundColor: color.toLowerCase() }} />
                          
                          {/* Paw Print Overlay */}
                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
                            ${selectedColor === color ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                          >
                            <FaPaw className={`w-6 h-6 ${
                              ['White', 'Yellow', 'Beige'].includes(color) ? 'text-black/20' : 'text-white/20'
                            }`} />
                          </div>
                        </div>

                        {/* Color Name */}
                        <span className={`text-xs font-medium transition-all duration-300 ${
                          selectedColor === color
                            ? 'text-pet-brown scale-110'
                            : 'text-pet-brown/70 group-hover:text-pet-brown'
                        }`}>
                          {color}
                        </span>

                        {/* Selected Indicator */}
                        <div className={`absolute -top-1 -right-1 w-4 h-4 bg-pet-brown rounded-full transform transition-all duration-300 flex items-center justify-center ${
                          selectedColor === color ? 'scale-100' : 'scale-0'
                        }`}>
                          <FaPaw className="w-2 h-2 text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <label className="block text-pet-brown font-medium">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange("minus")}
                      disabled={quantity <= 1}
                      className="p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 disabled:opacity-50"
                    >
                      <FaMinus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-medium text-pet-brown w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("plus")}
                      className="p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isButtonDisabled}
                    className="flex-1 bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onMouseEnter={() => setIsWishlistHovered(true)}
                    onMouseLeave={() => setIsWishlistHovered(false)}
                    onClick={handleWishlistToggle}
                    className={`p-3 rounded-xl transition-colors duration-300 ${
                      isInWishlist 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10'
                    }`}
                  >
                    <FaHeart className="w-5 h-5" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-pet-brown/10">
                  {[
                    { icon: <MdLocalShipping className="w-6 h-6" />, text: "Free Shipping" },
                    { icon: <RiRefund2Line className="w-6 h-6" />, text: "Easy Returns" },
                    { icon: <MdPets className="w-6 h-6" />, text: "Pet Approved" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-pet-beige/10 text-pet-brown group hover:bg-pet-brown/10 transition-all duration-300"
                    >
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts && similarProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold text-pet-brown flex items-center gap-2">
              <FaBone className="w-5 h-5 animate-bounce-gentle" />
              Similar Products
            </h2>
            <ProductGrid products={similarProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
