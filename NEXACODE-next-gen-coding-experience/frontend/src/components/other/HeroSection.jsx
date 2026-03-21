import React from 'react';
import { useNavigate } from 'react-router-dom';
import CodeAnimation from './CodeAnimation';
import Logo from '../layout/Logo';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-16 gap-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          <Logo size="Large" />
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300">
          Next Generation Code Editor
        </h2>
        <p className="text-gray-400 max-w-lg">
          Experience the future of coding with our powerful, collaborative editor. 
          Real-time collaboration, AI assistance, and cloud-based projects make 
          NEXACODE the perfect tool for modern developers.
        </p>
        <button
          onClick={() => navigate('/all')}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
      </div>
      <div className="flex-1 flex justify-center">
        <CodeAnimation />
      </div>
    </section>
  );
};

export default HeroSection;