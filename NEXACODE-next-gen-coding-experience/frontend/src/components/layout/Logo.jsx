import React from 'react';
import { motion } from 'framer-motion';
 import logoSvg from  '../../assets/nexa-code-logo.svg'

const Logo = ({ size = 'medium' }) => {
  // Size variants
  const sizeVariants = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl md:text-4xl'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const letters = ['N', 'E', 'X', 'A', 'C', 'O', 'D', 'E'];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`flex items-center font-bold ${sizeVariants[size]}`}
    >
      <img className='w-14 hover:scale-105 transition-all ease-linear duration-200' src={logoSvg} alt="" />
      {/* Animated letters */}
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          whileHover={{ y: -5 }}
          className={`
            ${index < 4 ? 'text-blue-600' : 'text-purple-600'}
            transition-colors duration-300
          `}
        >
          {letter}
        </motion.span>
      ))}
      
      {/* Optional dot */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        className="w-2 h-2 ml-1 rounded-full bg-green-400"
      />
    </motion.div>
  );
};

export default Logo;