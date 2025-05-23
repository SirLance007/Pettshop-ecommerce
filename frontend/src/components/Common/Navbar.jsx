import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiOutlineHeart,
  HiOutlineBell,
} from "react-icons/hi2";
import { FaPaw, FaBone, FaCat, FaDog } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { MdPets } from "react-icons/md";
import { GiHummingbird, GiRabbit, GiSittingDog } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const cartItemCount = cart?.products?.length || 0;
  const petEmojis = ['🐕', '🐈', '🐇', '🦜', '🐠', '🐹'];
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPetIndex((prev) => (prev + 1) % petEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 15000);
    return () => clearInterval(notificationInterval);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    setMobileMenuOpen(false);
  };

  const navIcons = {
    'Dogs': <FaDog className="w-5 h-5" />,
    'Cats': <FaCat className="w-5 h-5" />,
    'Small Pets': <GiRabbit className="w-5 h-5" />,
    'Birds': <GiHummingbird className="w-5 h-5" />
  };

  const handleCategoryClick = (category) => {
    navigate(`/collections/all?maxPrice=1000&petType=${category}`);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className="container mx-auto flex items-center justify-between py-5 px-4 sm:px-6 bg-white/95 rounded-3xl shadow-2xl mt-4 mb-4 sticky top-4 z-40 backdrop-blur-xl border border-pet-brown/20 hover:border-pet-brown/40 transition-all duration-300 transform hover:scale-[1.01]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pet-brown/10 to-pet-beige/20 rounded-full blur-xl transform rotate-45 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tl from-pet-brown/10 to-pet-beige/20 rounded-full blur-xl transform -rotate-45 animate-pulse delay-150"></div>
          {isHovered && (
            <>
              <FaBone className="absolute top-2 right-8 text-pet-brown/10 w-6 h-6 animate-float transform rotate-12" />
              <FaPaw className="absolute bottom-2 left-1/4 text-pet-brown/10 w-4 h-4 animate-float delay-100 transform -rotate-12" />
              <FaPaw className="absolute top-4 left-1/3 text-pet-brown/10 w-3 h-3 animate-float delay-200 transform rotate-45" />
              <FaBone className="absolute bottom-4 right-1/4 text-pet-brown/10 w-5 h-5 animate-float delay-300 transform -rotate-45" />
            </>
          )}
        </div>

        {/* Enhanced Logo */}
        <div className="flex items-center gap-2 sm:gap-3 group relative">
          <div className="relative hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-br from-pet-brown/30 to-pet-beige/30 rounded-full blur-lg animate-pulse"></div>
            <div className="relative z-10 bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-full p-3 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg hover:shadow-xl">
              <FaPaw className="h-6 w-6 text-white animate-bounce-gentle" />
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-pet-brown group-hover:scale-110 transition-transform duration-200"
          >
            <span className="relative">
              PawShop
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-pet-brown to-pet-brown/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </span>
            <span className="text-xl sm:text-2xl animate-bounce-gentle relative">
              {petEmojis[currentPetIndex]}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-pet-brown to-pet-brown/50 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            </span>
          </Link>
        </div>

        {/* Enhanced Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Dogs', 'Cats', 'Small Pets', 'Birds'].map((item) => (
            <Link
              key={item}
              to={`/collections/all?maxPrice=1000&petType=${item}`}
              className="nav-link relative group overflow-hidden px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <span className="relative z-10 text-pet-brown font-medium transition-colors duration-300 group-hover:text-white flex items-center gap-2">
                <span className="transform group-hover:rotate-12 transition-transform duration-300">{navIcons[item]}</span>
                {item}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pet-brown to-pet-brown/80 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-xl"></div>
              <div className="absolute inset-0 bg-pet-brown/5 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
          ))}
          
          {/* Admin Button for Desktop */}
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="nav-link relative group overflow-hidden px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <span className="relative z-10 text-pet-brown font-medium transition-colors duration-300 group-hover:text-white flex items-center gap-2">
                <span className="transform group-hover:rotate-12 transition-transform duration-300">
                  <MdPets className="w-5 h-5" />
                </span>
                Admin
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pet-brown to-pet-brown/80 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-xl"></div>
              <div className="absolute inset-0 bg-pet-brown/5 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2 sm:gap-4 relative z-50">
          {/* Search Icon */}
          <button
            onClick={toggleMobileSearch}
            className="md:hidden p-1.5 sm:p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 relative z-50 cursor-pointer"
          >
            <HiOutlineSearch className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:block w-full max-w-xs relative z-50">
            <SearchBar />
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-1.5 sm:p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 group z-50"
          >
            <HiOutlineHeart className="w-5 h-5 sm:w-6 sm:h-6" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center animate-fade-in">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative p-1.5 sm:p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 group z-50"
          >
            <HiOutlineShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-pet-brown text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <Link
              to="/profile"
              className="relative p-1.5 sm:p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 z-50 cursor-pointer"
            >
              <HiOutlineUser className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="relative p-1.5 sm:p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 z-50 cursor-pointer"
            >
              <HiOutlineUser className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-1.5 sm:p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 relative z-50"
          >
            <HiBars3BottomRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      <div className={`fixed inset-x-0 top-0 bg-white/95 p-4 transform transition-transform duration-300 z-[60] shadow-lg backdrop-blur-xl border-b border-pet-brown/10 ${
        mobileSearchOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SearchBar 
                isMobile={true} 
                autoFocus={true}
                onClose={() => setMobileSearchOpen(false)}
              />
            </div>
            <button
              onClick={toggleMobileSearch}
              className="p-2 rounded-xl bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300 flex-shrink-0 cursor-pointer"
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>
          {/* Quick Search Categories */}
          <div className="mt-4">
            <h3 className="text-pet-brown/60 text-sm mb-2">Popular Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {['Dogs', 'Cats', 'Small Pets', 'Birds'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="px-4 py-2 rounded-xl bg-pet-beige/10 text-pet-brown text-sm hover:bg-pet-brown/10 transition-colors duration-300 cursor-pointer flex items-center gap-2"
                >
                  {navIcons[category]}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Popular Searches */}
          <div className="mt-4">
            <h3 className="text-pet-brown/60 text-sm mb-2">Popular Searches:</h3>
            <div className="flex flex-wrap gap-2">
              {['Pet Food', 'Toys', 'Accessories', 'Treats', 'Grooming'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  navigate(`/collections/all?search=${term.toLowerCase()}`);
                  setMobileSearchOpen(false);
                }}
                  className="px-3 py-1.5 rounded-full bg-pet-beige/10 text-pet-brown text-sm hover:bg-pet-brown/10 transition-colors duration-300 cursor-pointer"
              >
                {term}
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-[50] ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={toggleMobileMenu}>
        <div
          className={`fixed inset-y-0 right-0 w-[280px] bg-white shadow-2xl transform transition-transform duration-300 p-6 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 p-2 rounded-full bg-pet-beige/20 text-pet-brown hover:bg-pet-brown/10 transition-colors duration-300"
          >
            <IoMdClose className="w-6 h-6" />
          </button>

          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-full p-2">
              <FaPaw className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-pet-brown">PawShop</span>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-pet-brown/60 uppercase tracking-wider mb-2">Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Dogs', 'Cats', 'Small Pets', 'Birds'].map((category) => (
                <Link
                  key={category}
                  to={`/collections/all?maxPrice=1000&petType=${category}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-pet-beige/10 text-pet-brown hover:bg-pet-brown/10 transition-all duration-300"
                  onClick={toggleMobileMenu}
                >
                  {navIcons[category]}
                  <span className="text-sm font-medium">{category}</span>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-pet-brown/60 uppercase tracking-wider mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to={user ? '/profile' : '/login'}
                  className="flex items-center gap-3 p-3 rounded-xl bg-pet-beige/10 text-pet-brown hover:bg-pet-brown/10 transition-all duration-300"
                  onClick={toggleMobileMenu}
                >
                  <HiOutlineUser className="w-5 h-5" />
                  <span className="font-medium">{user ? 'My Profile' : 'Sign In'}</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 p-3 rounded-xl bg-pet-beige/10 text-pet-brown hover:bg-pet-brown/10 transition-all duration-300"
                  onClick={toggleMobileMenu}
                >
                  <GiSittingDog className="w-5 h-5" />
                  <span className="font-medium">About Us</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 p-3 rounded-xl bg-pet-beige/10 text-pet-brown hover:bg-pet-brown/10 transition-all duration-300"
                  onClick={toggleMobileMenu}
                >
                  <HiOutlineHeart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    toggleCartDrawer();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-pet-beige/10 text-pet-brown hover:bg-pet-brown/10 transition-all duration-300"
                >
                  <HiOutlineShoppingBag className="w-5 h-5" />
                  <span className="font-medium">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="ml-auto bg-pet-brown text-white text-xs px-2 py-1 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Admin Panel Link */}
            {user && user.role === "admin" && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-pet-brown/60 uppercase tracking-wider mb-2">Admin</h3>
                <Link
                  to="/admin"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white font-medium shadow-lg"
                  onClick={toggleMobileMenu}
                >
                  <MdPets className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
