import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";
import Hero from "../components/Layout/Hero";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturesSection from "../components/Products/FeaturesSection";
import { MdPets } from "react-icons/md";
// Import images from assets
import dogsImage from "../assets/dogs.jpg";
import catsImage from "../assets/cats.jpg";
import birdsImage from "../assets/birds.jpg";
import smallPetsImage from "../assets/small-pets.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const petCategories = [
    {
      name: 'Dogs',
      image: dogsImage,
      icon: '🐕',
      description: 'Find the perfect products for your loyal companion',
      bgColor: 'from-yellow-400/20 to-orange-400/20'
    },
    {
      name: 'Cats',
      image: catsImage,
      icon: '🐈',
      description: 'Purr-fect items for your feline friend',
      bgColor: 'from-gray-400/20 to-blue-400/20'
    },
    {
      name: 'Small Pets',
      image: smallPetsImage,
      icon: '🐹',
      description: 'Everything for your tiny furry friends',
      bgColor: 'from-green-400/20 to-teal-400/20'
    },
    {
      name: 'Birds',
      image: birdsImage,
      icon: '🦜',
      description: 'Products to make your birds sing with joy',
      bgColor: 'from-blue-400/20 to-purple-400/20'
    }
  ];

  useEffect(() => {
    // Fetch popular pet products
    dispatch(
      fetchProductsByFilters({
        category: "Dogs",
        limit: 8,
      })
    );
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pet-brown flex items-center justify-center gap-3 mb-4">
            <FaPaw className="w-8 h-8 text-pet-brown animate-bounce-gentle" />
            Shop by Pet
            <FaPaw className="w-8 h-8 text-pet-brown animate-bounce-gentle delay-100" />
          </h2>
          <p className="text-pet-brown/70 text-lg max-w-2xl mx-auto">
            Find the perfect products for your furry, feathered, and scaly friends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {petCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.5
                }
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl shadow-lg border border-pet-brown/10 hover:border-pet-brown/30 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/collections/all?maxPrice=1000&petType=${category.name}`)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </div>
                  <p className="text-white/90 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    {category.description}
                  </p>
                  <button className="w-full bg-white/90 text-pet-brown py-2.5 px-4 rounded-xl font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white transform -translate-y-4 group-hover:translate-y-0 flex items-center justify-center gap-2">
                    <FaPaw className="w-4 h-4" />
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <FaPaw className="absolute top-4 right-4 text-white/20 w-6 h-6 transform rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <FaPaw className="absolute bottom-4 left-4 text-white/20 w-4 h-4 transform -rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pet-brown flex items-center justify-center gap-3 mb-4">
            <MdPets className="w-8 h-8 text-pet-brown animate-bounce-gentle" />
            Popular Products
            <MdPets className="w-8 h-8 text-pet-brown animate-bounce-gentle delay-100" />
          </h2>
          <p className="text-pet-brown/70 text-lg max-w-2xl mx-auto">
            Discover our most loved pet products and accessories
          </p>
        </div>
        <ProductGrid products={products} loading={loading} error={error} />
      </section>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default Home;
