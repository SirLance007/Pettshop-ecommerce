import React, { useState, useRef, useEffect } from "react";
import { FaPaw } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isSidebarOpen) return;
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Handler to close sidebar from child
  const handleSidebarNav = () => setIsSidebarOpen(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white z-30 shadow-lg px-4 py-3 items-center">
        <button
          onClick={toggleSideBar}
          className="flex items-center gap-3 focus:outline-none"
        >
          <FaPaw size={28} className="animate-bounce" />
          <h1 className="ml-2 text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-orange-200 drop-shadow-lg animate-gradient-x">
            PawShop Admin
          </h1>
        </button>
      </div>
      {/* Overlay for side bar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-40 md:hidden animate-fade-in"
          onClick={toggleSideBar}
        ></div>
      )}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-gradient-to-b from-pet-brown via-pet-brown/90 to-pet-brown/80 w-72 min-h-screen text-white absolute md:relative transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block z-30 shadow-2xl rounded-r-3xl overflow-hidden animate-fade-in`}
      >
        <AdminSidebar onNav={handleSidebarNav} />
      </div>
      {/* Main Content */}
      <div className="flex-grow p-2 sm:p-6 overflow-auto relative z-10 animate-fade-in-up">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-4 right-4 text-pet-brown/10 text-8xl pointer-events-none">
        <FaPaw className="transform rotate-12" />
      </div>
      <div className="fixed top-4 right-4 text-pet-brown/5 text-6xl pointer-events-none">
        <FaPaw className="transform -rotate-12" />
      </div>
    </div>
  );
};

export default AdminLayout;
