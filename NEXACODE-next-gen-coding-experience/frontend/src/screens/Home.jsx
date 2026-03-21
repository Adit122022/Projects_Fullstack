import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/other/HeroSection';
import BackgroundVideo from '../components/other/BackgroundVideo';
import FeaturesSection from '../components/other/FeaturesSection';
import Testimonials from '../components/other/Testimonials';
import Footer from '../components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden"
    >
      {/* Unique Grid Background */}
      <div className="fixed inset-0 -z-20 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f46e511_0%,transparent_50%)]"></div>
      </div>

      {/* Shining Gradient Background */}
      <div className="fixed inset-0 -z-30">
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#1e3a8a_0%,#1e40af_25%,#9333ea_50%,#1e40af_75%,#1e3a8a_100%)] opacity-20 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
      </div>

      <BackgroundVideo overlayOpacity={0.5} />
      
      <main className="relative z-10">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900/80 backdrop-blur-sm border-y border-gray-800">
          <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Why Choose NEXACODE?
            </h2>
            
            <FeaturesSection />
          </motion.div>
        </section>
        
        {/* Demo Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900/70 backdrop-blur-sm">
          <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Experience the Power
            </h2>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm"
            >
              <div className="p-4 bg-gradient-to-r from-blue-600/90 to-purple-600/90 border-b border-gray-800">
                <h3 className="text-xl font-semibold text-white">Live Demo</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">
                  Try our interactive demo below to see NEXACODE in action. No installation required!
                </p>
                <button
                  onClick={() => navigate('/demo')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-blue-500/30"
                >
                  Launch Interactive Demo
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900/60 backdrop-blur-sm border-y border-gray-800">
          <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              What Developers Say
            </h2>
            <Testimonials />
          </motion.div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
          {/* Shining particles */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `shine ${Math.random() * 5 + 5}s infinite alternate`,
                }}
              />
            ))}
          </div>
          
          <motion.div 
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Ready to Transform Your Coding Experience?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join thousands of developers who are already building faster and better with NEXACODE.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => navigate('/register')}
                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-xl hover:shadow-purple-500/40 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Get Started for Free
              </button>
            </motion.div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Home;