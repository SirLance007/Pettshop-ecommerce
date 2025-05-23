import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaUsers,
  FaStore,
  FaPaw,
  FaBone,
  FaCat,
  FaDog,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/authSlice";

const AdminSidebar = ({ onNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
    if (onNav) onNav();
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-pet-brown via-pet-brown/90 to-pet-brown/80 shadow-2xl rounded-r-3xl relative overflow-hidden animate-fade-in">
      {/* Animated paw prints background */}
      <div className="absolute inset-0 opacity-5">
        <FaPaw className="absolute top-10 left-10 w-20 h-20 transform rotate-45 animate-float-slow" />
        <FaPaw className="absolute bottom-20 right-10 w-16 h-16 transform -rotate-12 animate-float-fast" />
        <FaBone className="absolute top-1/2 left-1/3 w-24 h-24 transform rotate-90 animate-float-medium" />
      </div>

      <div className="mb-8 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaPaw className="text-4xl text-yellow-400 animate-bounce" />
          <Link
            to="/admin"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-200 drop-shadow-lg tracking-tight"
          >
            PawShop
          </Link>
        </div>
        <h2 className="text-xl font-bold text-center text-yellow-100/90 tracking-wide">
          Admin Dashboard
        </h2>
      </div>

      <nav className="flex flex-col space-y-3 relative z-10">
        <NavLink
          to="/admin/users"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white shadow-lg scale-105"
              : "text-yellow-100/90 hover:bg-gradient-to-r hover:from-yellow-500/40 hover:to-orange-500/40 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up"
          }
        >
          <FaUsers className="text-lg group-hover:animate-bounce" />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white shadow-lg scale-105"
              : "text-yellow-100/90 hover:bg-gradient-to-r hover:from-yellow-500/40 hover:to-orange-500/40 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up delay-75"
          }
        >
          <FaBoxOpen className="text-lg group-hover:animate-bounce" />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white shadow-lg scale-105"
              : "text-yellow-100/90 hover:bg-gradient-to-r hover:from-yellow-500/40 hover:to-orange-500/40 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up delay-150"
          }
        >
          <FaClipboardList className="text-lg group-hover:animate-bounce" />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white shadow-lg scale-105"
              : "text-yellow-100/90 hover:bg-gradient-to-r hover:from-yellow-500/40 hover:to-orange-500/40 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up delay-200"
          }
        >
          <FaStore className="text-lg group-hover:animate-bounce" />
          <span>Shop</span>
        </NavLink>

        <div className="pt-6 animate-fade-in-up delay-300">
          <button
            className="w-full bg-gradient-to-r from-red-500/80 to-orange-600/80 text-white py-3 px-4 rounded-2xl flex items-center justify-center space-x-3 font-bold shadow-lg hover:scale-105 hover:shadow-orange-400/30 transition-all group"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="group-hover:animate-bounce" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Pet icons decoration at bottom */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-yellow-400/20">
        <FaDog className="w-8 h-8 animate-float-slow" />
        <FaCat className="w-8 h-8 animate-float-medium" />
        <FaPaw className="w-8 h-8 animate-float-fast" />
      </div>
    </div>
  );
};

export default AdminSidebar;
