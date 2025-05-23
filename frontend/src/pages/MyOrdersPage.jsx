import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../redux/slices/orderSlice";
import { FaPaw } from "react-icons/fa";
import { toast } from "react-toastify";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const petEmojis = ['🐕', '🐈', '🐇', '🦜', '🐠', '🐹'];
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  // Get user authentication state
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.order || { orders: [], loading: false, error: null });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPetIndex((prev) => (prev + 1) % petEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if user is logged in before fetching orders
    if (!user || !localStorage.getItem("userToken")) {
      toast.error("Please login to view your orders", {
        position: "top-right",
        autoClose: 3000
      });
      navigate('/login?redirect=my-orders');
      return;
    }
    dispatch(getAllOrders());
  }, [dispatch, user, navigate]);

  // Handle unauthorized error in useEffect
  useEffect(() => {
    if (error?.message === "User not authenticated" || error?.message === "No authentication token found") {
      toast.error("Please login again to view your orders", {
        position: "top-right",
        autoClose: 3000
      });
      navigate('/login?redirect=my-orders');
    }
  }, [error, navigate]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-pet-brown text-xl animate-bounce flex items-center gap-2">
        Loading <span className="animate-spin">🐾</span>
      </div>
    </div>
  );
  
  if (error && error.message !== "User not authenticated" && error.message !== "No authentication token found") {
    return (
    <div className="flex items-center justify-center p-8">
        <div className="text-red-500 text-xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="animate-bounce">😿</span>
            {error.message || 'Something went wrong'}
          </div>
          <button
            onClick={() => dispatch(getAllOrders())}
            className="px-6 py-2 bg-pet-brown text-white rounded-xl hover:bg-pet-brown/90 transition-colors duration-300 flex items-center gap-2"
          >
            <FaPaw className="w-4 h-4" />
            Try Again
          </button>
      </div>
    </div>
  );
  }

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
              <span className="text-2xl transform transition-transform duration-300 group-hover:scale-110">
                {isHovered ? '📦' : petEmojis[currentPetIndex]}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-pet-brown tracking-tight flex items-center gap-2 relative">
              My Orders
              <span className="absolute -top-6 -right-6 text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {petEmojis[currentPetIndex]}
              </span>
            </h2>
            <p className="text-pet-brown/60 mt-1 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              Track your pawsome purchases here! 🐾
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <span className="text-4xl animate-float">🎁</span>
        </div>
      </div>

      <div className="relative rounded-2xl shadow-lg sm:rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <div className="no-scrollbar overflow-x-auto w-full">
          <table className="min-w-full text-left text-pet-brown/80 text-sm sm:text-base">
            <thead className="bg-pet-brown/5 text-xs uppercase text-pet-brown/70">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Order Id</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Shipping Address</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    onClick={() => handleRowClick(order._id)}
                    key={order._id}
                    className="border-b border-pet-brown/10 last:border-b-0 hover:bg-pet-beige/5 transition-all duration-300 cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-pet-brown/5 rounded-lg transform -rotate-3 transition-transform group-hover:rotate-3"></div>
                        <img
                          className="w-12 h-12 object-cover rounded-lg border-2 border-white relative z-10 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg"
                          src={
                            order.orderItems &&
                            order.orderItems[0] &&
                            order.orderItems[0].image
                          }
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="font-semibold text-pet-brown whitespace-nowrap py-3 px-4">
                      #{order._id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="block text-pet-brown font-medium">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                      <span className="block text-xs text-pet-brown/40">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleTimeString()
                          : ""}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="block font-medium text-pet-brown">
                        {order.shippingAddress && order.shippingAddress.city}
                      </span>
                      <span className="block text-xs text-pet-brown/40">
                        {order.shippingAddress && order.shippingAddress.country}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-pet-beige/20 rounded-xl px-4 py-2 text-xs font-semibold text-pet-brown transition-all duration-300 group-hover:bg-pet-brown group-hover:text-white">
                        {order.orderItems ? order.orderItems.length : 0} items
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-pet-brown">
                      ${order.totalPrice}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`${
                          order.isPaid
                            ? "bg-pet-brown/10 text-pet-brown"
                            : "bg-yellow-100 text-yellow-700"
                        } px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 w-fit`}
                      >
                        {order.isPaid ? (
                          <>
                            <span className="animate-bounce-gentle">✅</span> Paid
                          </>
                        ) : (
                          <>
                            <span className="animate-spin-slow">⏳</span> Pending
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-6xl animate-bounce-gentle">🛍️</span>
                      <p className="text-pet-brown/40 text-lg">No orders yet. Time to go shopping!</p>
                      <button
                        onClick={() => navigate('/collections/all')}
                        className="mt-4 px-6 py-3 bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
                      >
                        <span>Start Shopping</span>
                        <span className="text-xl">→</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
