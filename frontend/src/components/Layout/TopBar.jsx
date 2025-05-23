import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPaw, FaBone } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/5 rounded-full blur-xl transform rotate-45 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-white/5 rounded-full blur-xl transform -rotate-45 animate-pulse delay-150"></div>
        <FaPaw className="absolute top-1 right-[20%] text-white/10 w-4 h-4 animate-float" />
        <FaBone className="absolute bottom-1 left-[15%] text-white/10 w-5 h-5 animate-float delay-500" />
        <FaPaw className="absolute top-2 left-1/3 text-white/10 w-3 h-3 animate-float delay-1000" />
      </div>

      <div className="container mx-auto flex justify-between items-center py-2 px-4 relative">
        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="group bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="h-4 w-4 text-white group-hover:text-white/90" />
          </a>
          <a
            href="#"
            className="group bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-4 w-4 text-white group-hover:text-white/90" />
          </a>
          <a
            href="#"
            className="group bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="h-4 w-4 text-white group-hover:text-white/90" />
          </a>
        </div>

        {/* Announcement */}
        <div className="text-sm text-center flex-grow font-medium tracking-wide">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg group hover:bg-white/20 transition-all duration-300 cursor-default">
            <MdLocalShipping className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">Free Shipping Worldwide</span>
            <span className="sm:hidden">Free Shipping</span>
            <span className="hidden lg:inline">— Fast & Reliable Delivery</span>
          </div>
        </div>

        {/* Contact */}
        <div className="text-sm hidden md:block">
          <a
            href="tel:+918005665228"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group transform hover:scale-105"
          >
            <FiPhoneCall className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium">+91 8005665228</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
