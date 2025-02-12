import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  FaSearch, 
  FaUtensils,
  FaArrowRight
} from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const cuisines = [
    { 
      id: 'italian', 
      name: 'Italian',
      description: 'Classic pasta, pizza & more',
      image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3'
    },
    {
      id: 'japanese',
      name: 'Japanese',
      description: 'Sushi, ramen & traditional dishes',
      image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-4.0.3'
    },
    {
      id: 'mexican',
      name: 'Mexican',
      description: 'Tacos, enchiladas & spicy favorites',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3'
    },
    {
      id: 'indian',
      name: 'Indian',
      description: 'Curries, tandoori & rich spices',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3'
    }
  ];

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search', { state: { query: searchQuery, mode: 'recipe' } });
    }
  };

  const handleCuisineClick = (cuisine) => {
    navigate('/search', { state: { query: cuisine.name, mode: 'recipe' } });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribeLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeSuccess(true);
      setEmail('');
      setTimeout(() => setSubscribeSuccess(false), 3000);
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  // Optimized animation variants
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    }
  };

  // Use reduced motion if preferred
  const safeAnimations = prefersReducedMotion ? {
    container: { visible: { opacity: 1 }, hidden: { opacity: 0 } },
    item: { visible: { opacity: 1 }, hidden: { opacity: 0 } }
  } : animations;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[700px] bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl font-bold mb-6 leading-tight"
            >
              Your Kitchen,<br />Your Rules
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl mb-8 text-gray-100"
            >
              Discover recipes that match your ingredients, preferences, and cooking style.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              onSubmit={handleQuickSearch}
              className="mb-8"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <FaSearch /> Search
                </button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex gap-4"
            >
              <Link
                to="/nutrition"
                className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FaUtensils /> Track Meals
              </Link>
              <Link
                to="/about"
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trending Categories */}
      <motion.section 
        variants={safeAnimations.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={safeAnimations.item} className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Trending Categories</h2>
            <Link to="/search" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">
              View All <FaArrowRight />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cuisines.map((cuisine, index) => (
              <motion.div
                key={cuisine.id}
                variants={safeAnimations.item}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                onClick={() => handleCuisineClick(cuisine)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-square">
                  <img 
                    src={cuisine.image} 
                    alt={cuisine.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute bottom-4 left-4"
                  >
                    <h3 className="text-white text-xl font-semibold">{cuisine.name}</h3>
                    <p className="text-white/80 text-sm">{cuisine.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        variants={safeAnimations.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={safeAnimations.item} className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full filter blur-3xl opacity-20"
            />
            
            <div className="relative">
              <motion.h2 
                variants={safeAnimations.item}
                className="text-3xl font-bold mb-4"
              >
                Get Weekly Recipe Updates
              </motion.h2>
              <motion.p 
                variants={safeAnimations.item}
                className="text-white/90 mb-8"
              >
                Subscribe to our newsletter and receive hand-picked recipes, cooking tips, and exclusive content
              </motion.p>
              
              <motion.form 
                variants={safeAnimations.item}
                onSubmit={handleSubscribe}
                className="flex gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/20 outline-none"
                  required
                />
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  type="submit"
                  disabled={subscribeLoading}
                  className="px-8 py-3 bg-white text-orange-500 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </motion.form>

              <AnimatePresence>
                {subscribeSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full left-0 right-0 mt-4 text-center text-white"
                  >
                    Thanks for subscribing! Check your email for confirmation.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        variants={safeAnimations.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            variants={safeAnimations.item}
            className="text-4xl font-bold mb-4"
          >
            Ready to Start Your Culinary Journey?
          </motion.h2>
          <motion.p 
            variants={safeAnimations.item}
            className="text-xl mb-8 text-white/90 max-w-2xl mx-auto"
          >
            Join our community of food enthusiasts and start exploring thousands of recipes today
          </motion.p>
          <motion.div 
            variants={safeAnimations.item}
            className="flex justify-center gap-4"
          >
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}>
              <Link
                to="/search"
                className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <FaSearch /> Start Exploring
              </Link>
            </motion.div>
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}>
              <Link
                to="/about"
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-flex items-center gap-2 border-2 border-white/20"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;