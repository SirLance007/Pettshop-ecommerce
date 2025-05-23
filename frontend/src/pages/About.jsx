import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaBone, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { MdPets, MdLocalShipping } from 'react-icons/md';
import { GiDogBowl } from 'react-icons/gi';
import ProfilePicture from '../assets/ProfilePicture.jpg';

const About = () => {
  const features = [
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: "Pet-First Approach",
      description: "Every product we offer is carefully selected with your pet's well-being in mind."
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "We partner with trusted brands to ensure the highest quality pet products."
    },
    {
      icon: <MdLocalShipping className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to get your pet supplies when you need them."
    },
    {
      icon: <GiDogBowl className="w-6 h-6" />,
      title: "Wide Selection",
      description: "From food to toys, we have everything your pet needs to thrive."
    }
  ];

  const teamMembers = [
    {
      name: "Prankur Sharma",
      role: "Founder & CEO",
      description: "Web Wizard"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pet-brown/5 to-pet-beige/20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-pet-brown/10 to-pet-beige/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-pet-brown/10 to-pet-beige/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <FaPaw className="absolute top-20 right-[20%] text-pet-brown/10 w-12 h-12 animate-float" />
          <FaBone className="absolute bottom-32 left-[15%] text-pet-brown/10 w-16 h-16 animate-float delay-500" />
          <FaPaw className="absolute top-1/2 right-[10%] text-pet-brown/10 w-8 h-8 animate-float delay-1000" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-pet-brown mb-6">
              Our Story
            </h1>
            <p className="text-lg text-pet-brown/70 mb-8 leading-relaxed">
              Welcome to PawShop, where every pet is family. Founded in 2023, we've made it our mission to provide the highest quality products for your beloved pets. Our journey started with a simple belief: pets deserve the very best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-pet-brown to-pet-brown/80 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-pet-brown mb-2">{feature.title}</h3>
                <p className="text-pet-brown/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-pet-brown text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={ProfilePicture}
                  alt="Prankur Sharma" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=Prankur+Sharma&background=8B4513&color=fff&size=128`;
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-pet-brown mb-1">{teamMembers[0].name}</h3>
              <p className="text-pet-brown/60 text-sm mb-3">{teamMembers[0].role}</p>
              <p className="text-pet-brown/70">{teamMembers[0].description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-pet-brown mb-6">Our Mission</h2>
            <p className="text-lg text-pet-brown/70 mb-8 leading-relaxed">
              At PawShop, we're committed to enhancing the lives of pets and their owners through quality products, expert advice, and exceptional service. We believe that every pet deserves the best care possible, and we're here to make that happen.
            </p>
            <div className="flex items-center justify-center gap-2 text-pet-brown/30 text-4xl">
              <FaPaw className="animate-bounce-gentle" />
              <FaBone className="animate-bounce-gentle delay-100" />
              <FaPaw className="animate-bounce-gentle delay-200" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 