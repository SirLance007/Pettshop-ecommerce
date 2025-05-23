import React, { useEffect, useState } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const petEmojis = ['🐕', '🐈', '🐇', '🦜', '🐠', '🐹'];
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPetIndex((prev) => (prev + 1) % petEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    toast.info("Come back soon! 🐾", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pet-beige via-white to-pet-beige/30">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="paw-print absolute top-20 left-10 opacity-10 animate-float">🐾</div>
        <div className="paw-print absolute top-40 right-20 opacity-10 animate-float-delayed">🐾</div>
        <div className="paw-print absolute bottom-20 left-1/4 opacity-10 animate-float">🐾</div>
        <div className="bone absolute top-1/4 left-1/3 opacity-10 animate-spin-slow">🦴</div>
        <div className="bone absolute bottom-1/4 right-1/3 opacity-10 animate-spin-slow-delayed">🦴</div>
        <div className="absolute top-1/2 left-10 opacity-20 animate-bounce-gentle text-4xl">{petEmojis[currentPetIndex]}</div>
        <div className="absolute bottom-1/3 right-10 opacity-20 animate-float text-4xl">🎾</div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Enhanced Profile Card */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div 
              className="bg-white/90 rounded-3xl shadow-2xl p-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)] relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Decorative Corner Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform rotate-12 animate-spin-slow">
                <span className="text-2xl">{petEmojis[currentPetIndex]}</span>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform -rotate-12 animate-spin-slow">
                <span className="text-2xl">🦴</span>
              </div>

              {/* Enhanced Profile Header */}
              <div className="text-center mb-8 relative">
                <div className="relative mx-auto w-32 h-32 mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pet-brown/20 to-pet-beige rounded-full blur-xl animate-pulse group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-pet-brown to-pet-beige flex items-center justify-center shadow-xl border-4 border-white transform transition-all duration-500 hover:rotate-12 hover:scale-110 cursor-pointer group">
                    <span className="text-4xl font-bold text-white select-none group-hover:animate-bounce">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -right-2 -bottom-2 bg-white rounded-full p-2 shadow-lg transform transition-all duration-300 hover:scale-125 hover:rotate-12">
                    <span className="text-2xl animate-bounce-gentle">{isHovered ? '❤️' : '🐾'}</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-pet-brown relative inline-block">
                  {user?.name}
                  <span className="absolute -top-4 -right-4 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {petEmojis[currentPetIndex]}
                  </span>
                </h1>
                <p className="text-pet-brown/60 relative">
                  {user?.email}
                  <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs text-pet-brown/40">
                    Proud pet parent 🐾
                  </span>
                </p>
              </div>

              {/* Enhanced Divider with Animated Paw Prints */}
              <div className="relative h-px bg-gradient-to-r from-transparent via-pet-brown/20 to-transparent my-8">
                <div className="absolute -top-2 left-0 right-0 flex justify-center space-x-4">
                  <span className="text-sm opacity-30 transform hover:scale-150 transition-transform duration-300 cursor-pointer">🐾</span>
                  <span className="text-sm opacity-30 transform hover:scale-150 transition-transform duration-300 cursor-pointer animate-bounce-gentle">🐾</span>
                  <span className="text-sm opacity-30 transform hover:scale-150 transition-transform duration-300 cursor-pointer">🐾</span>
                </div>
              </div>

              {/* Enhanced Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
                <span className="relative z-10">Logout</span>
                <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  👋
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Orders Section */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-6 backdrop-blur-sm transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,69,19,0.2)] relative overflow-hidden">
              {/* Decorative Corner Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform -rotate-12 animate-spin-slow opacity-50">
                <span className="text-2xl">🎁</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pet-brown/10 rounded-full flex items-center justify-center transform rotate-12 animate-spin-slow opacity-50">
                <span className="text-2xl">📦</span>
              </div>
              
              <MyOrdersPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
