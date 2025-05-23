import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaBone } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[780px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pet-brown/5 to-pet-beige/20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-pet-brown/10 to-pet-beige/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-pet-brown/10 to-pet-beige/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <FaPaw className="absolute top-20 right-[20%] text-pet-brown/10 w-12 h-12 animate-float" />
        <FaBone className="absolute bottom-32 left-[15%] text-pet-brown/10 w-16 h-16 animate-float delay-500" />
        <FaPaw className="absolute top-1/2 right-[10%] text-pet-brown/10 w-8 h-8 animate-float delay-1000" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating Pet Icons */}
          <div className="flex gap-4 sm:gap-8 justify-center mb-12">
            {['🐕', '🐈', '🐇', '🦜', '🐠', '🐹'].map((emoji, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                }}
                className="text-2xl sm:text-4xl filter drop-shadow-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-pet-brown mb-6 tracking-tight">
              Welcome to{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-pet-brown to-pet-brown/80 text-transparent bg-clip-text">
                  PawShop
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pet-brown to-pet-brown/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-pet-brown/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Discover premium products for your beloved pets. From tasty treats to cozy beds, we've got everything your furry friends need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/collections/all"
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pet-brown to-pet-brown/80 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <FaPaw className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Shop Now</span>
            </Link>
            <Link
              to="/about"
              className="group relative inline-flex items-center justify-center gap-2 bg-white/90 text-pet-brown px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-pet-brown/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <FaBone className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Learn More</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
