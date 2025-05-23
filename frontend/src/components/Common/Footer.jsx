import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaBone, FaCat, FaDog, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { MdPets, MdLocalOffer, MdSupportAgent } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { GiSittingDog, GiBirdHouse, GiRabbit } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-pet-beige/20 to-white border-t pt-16 pb-8 px-4 mt-12 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FaPaw className="absolute top-12 left-[5%] text-pet-brown/5 w-12 h-12 transform -rotate-12" />
        <FaBone className="absolute bottom-24 right-[10%] text-pet-brown/5 w-16 h-16 transform rotate-45" />
        <FaPaw className="absolute top-1/3 right-[15%] text-pet-brown/5 w-8 h-8 transform rotate-45" />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-4 relative">
        {/* Newsletter */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-xl p-2 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <MdPets className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-pet-brown tracking-tight">
              Join Our Pack
            </h3>
          </div>
          <p className="text-pet-brown/70">
            Subscribe to fetch amazing deals and pawsome updates!
          </p>
          <p className="font-medium text-pet-brown/80 text-sm">
            Get 10% off your first order 🐾
          </p>
          <form className="relative group">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-5 py-3 rounded-xl bg-white/80 border border-pet-brown/10 focus:border-pet-brown/30 focus:ring-2 focus:ring-pet-brown/20 outline-none transition-all duration-300 pr-36"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white px-6 py-1.5 rounded-lg text-sm font-semibold hover:from-pet-brown/90 hover:to-pet-brown transition-all duration-300 shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-xl p-2 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <MdLocalOffer className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-pet-brown tracking-tight">
              Quick Links
            </h3>
          </div>
          <ul className="space-y-3 text-pet-brown/70">
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="/about">
                <GiSittingDog className="w-4 h-4" />
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="#">
                <FaPaw className="w-4 h-4" />
                Pet Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="#">
                <FaBone className="w-4 h-4" />
                Careers
              </Link>
            </li>
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="#">
                <MdPets className="w-4 h-4" />
                Shipping Info
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop By Pet */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-xl p-2 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <MdPets className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-pet-brown tracking-tight">
              Shop By Pet
            </h3>
          </div>
          <ul className="space-y-3 text-pet-brown/70">
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="/collections/all?maxPrice=1000&petType=Dogs">
                <FaDog className="w-4 h-4" />
                Dogs
              </Link>
            </li>
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="/collections/all?maxPrice=1000&petType=Cats">
                <FaCat className="w-4 h-4" />
                Cats
              </Link>
            </li>
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="/collections/all?maxPrice=1000&petType=Small Pets">
                <GiRabbit className="w-4 h-4" />
                Small Pets
              </Link>
            </li>
            <li>
              <Link className="hover:text-pet-brown transition-colors duration-300 flex items-center gap-2" to="/collections/all?maxPrice=1000&petType=Birds">
                <GiBirdHouse className="w-4 h-4" />
                Birds
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-pet-brown to-pet-brown/80 rounded-xl p-2 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <MdSupportAgent className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-pet-brown tracking-tight">
              Need Help?
            </h3>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-pet-brown/80 font-medium bg-white/80 rounded-xl px-4 py-3 shadow-sm border border-pet-brown/5 hover:border-pet-brown/20 transition-colors duration-300">
              <FiPhoneCall className="w-5 h-5 text-pet-brown" />
              <span>1-800-PET-SHOP</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-xl shadow-sm border border-pet-brown/5 hover:border-pet-brown/20 text-pet-brown/70 hover:text-pet-brown transition-all duration-300 group"
              >
                <FaFacebookF className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-xl shadow-sm border border-pet-brown/5 hover:border-pet-brown/20 text-pet-brown/70 hover:text-pet-brown transition-all duration-300 group"
              >
                <FaInstagram className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-xl shadow-sm border border-pet-brown/5 hover:border-pet-brown/20 text-pet-brown/70 hover:text-pet-brown transition-all duration-300 group"
              >
                <FaTwitter className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-16 px-4">
        <div className="border-t border-pet-brown/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-pet-brown/60 text-sm">
            <p>© 2024 PawShop. All rights reserved 🐾</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-pet-brown transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-pet-brown transition-colors duration-300">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-pet-brown transition-colors duration-300">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
