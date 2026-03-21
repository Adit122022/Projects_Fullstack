import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Real-time Collaboration",
    description: "Code together in real-time with your team, no matter where they are.",
    icon: "👥"
  },
  {
    title: "AI Assistance",
    description: "Get intelligent code suggestions and auto-completion powered by AI.",
    icon: "🤖"
  },
  {
    title: "Cloud-Based",
    description: "Access your projects from any device with automatic cloud sync.",
    icon: "☁️"
  },
  {
    title: "Customizable",
    description: "Tailor the editor to your workflow with themes, layouts, and extensions.",
    icon: "🎨"
  }
];

const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -10 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all"
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesSection;