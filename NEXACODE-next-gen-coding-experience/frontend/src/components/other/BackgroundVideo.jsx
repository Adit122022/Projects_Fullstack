import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
 import bgVideo from '../../assets/background.mp4'

const BackgroundVideo = ({ overlayOpacity = 0.7 }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video with loading state */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="min-w-full min-h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsLoaded(false)}
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Black overlay with adjustable opacity */}
      <motion.div 
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayOpacity }}
        transition={{ duration: 1 }}
      />

      {/* Optional: Subtle animated elements for visual interest */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ delay: 1, duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 20],
              x: [0, (Math.random() - 0.5) * 10],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BackgroundVideo;