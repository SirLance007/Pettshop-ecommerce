import React from "react";
import { FaShippingFast, FaPaw, FaBone, FaShieldAlt } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pet-brown/5 to-pet-beige/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaPaw className="absolute top-20 right-[20%] text-pet-brown/10 w-12 h-12 animate-float" />
        <FaBone className="absolute bottom-32 left-[15%] text-pet-brown/10 w-16 h-16 animate-float delay-500" />
        <FaPaw className="absolute top-1/2 right-[10%] text-pet-brown/10 w-8 h-8 animate-float delay-1000" />
        <div className="absolute -top-4 -right-4 w-64 h-64 bg-gradient-to-br from-pet-brown/5 to-pet-beige/10 rounded-full blur-3xl transform rotate-45 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-96 h-96 bg-gradient-to-tl from-pet-brown/5 to-pet-beige/10 rounded-full blur-3xl transform -rotate-45 animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Feature 1 - Returns */}
        <motion.div 
          variants={itemVariants}
          className="group relative"
        >
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-pet-brown/10 hover:border-pet-brown/30">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pet-brown/20 to-pet-beige/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative z-10 bg-gradient-to-br from-pet-brown to-pet-brown/80 p-6 rounded-2xl transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                <FaShippingFast className="text-3xl text-white" />
              </div>
            </div>
            <h4 className="tracking-tight mt-6 mb-2 text-xl font-bold text-pet-brown">
              45 Days Return
            </h4>
            <p className="text-pet-brown/70 text-base">
              Hassle-free returns with money-back guarantee
            </p>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <FaPaw className="absolute top-2 right-2 text-pet-brown/10 w-6 h-6 animate-float" />
              <FaBone className="absolute bottom-2 left-2 text-pet-brown/10 w-4 h-4 animate-float delay-100" />
            </div>
          </div>
        </motion.div>

        {/* Feature 2 - Free Shipping */}
        <motion.div 
          variants={itemVariants}
          className="group relative"
        >
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-pet-brown/10 hover:border-pet-brown/30">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pet-brown/20 to-pet-beige/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative z-10 bg-gradient-to-br from-pet-brown to-pet-brown/80 p-6 rounded-2xl transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                <FaPaw className="text-3xl text-white" />
              </div>
            </div>
            <h4 className="tracking-tight mt-6 mb-2 text-xl font-bold text-pet-brown">
              FREE SHIPPING
            </h4>
            <p className="text-pet-brown/70 text-base">
              Free worldwide shipping on orders over $100
            </p>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <FaPaw className="absolute top-2 right-2 text-pet-brown/10 w-6 h-6 animate-float" />
              <FaBone className="absolute bottom-2 left-2 text-pet-brown/10 w-4 h-4 animate-float delay-100" />
            </div>
          </div>
        </motion.div>

        {/* Feature 3 - Secure Checkout */}
        <motion.div 
          variants={itemVariants}
          className="group relative"
        >
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-pet-brown/10 hover:border-pet-brown/30">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pet-brown/20 to-pet-beige/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative z-10 bg-gradient-to-br from-pet-brown to-pet-brown/80 p-6 rounded-2xl transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
            </div>
            <h4 className="tracking-tight mt-6 mb-2 text-xl font-bold text-pet-brown">
              SECURE CHECKOUT
            </h4>
            <p className="text-pet-brown/70 text-base">
              100% Secure payment process
            </p>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <FaPaw className="absolute top-2 right-2 text-pet-brown/10 w-6 h-6 animate-float" />
              <FaBone className="absolute bottom-2 left-2 text-pet-brown/10 w-4 h-4 animate-float delay-100" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
