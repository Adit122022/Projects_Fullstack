import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900/80 text-gray-400 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            NEXACODE
          </h3>
          <p className="text-sm">
            The next generation code editor for modern developers.
          </p>
        </motion.div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Product</h4>
          <ul className="space-y-2">
            {['Features', 'Pricing', 'Demo', 'Download'].map((item, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                className="cursor-pointer hover:text-white transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Resources</h4>
          <ul className="space-y-2">
            {['Documentation', 'Tutorials', 'Blog', 'Community'].map((item, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                className="cursor-pointer hover:text-white transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2">
            {['About', 'Careers', 'Contact', 'Press'].map((item, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                className="cursor-pointer hover:text-white transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-sm text-center">
        <p>© {new Date().getFullYear()} NEXACODE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;