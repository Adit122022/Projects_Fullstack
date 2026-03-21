import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "NEXACODE has completely transformed how our remote team collaborates. The real-time editing is flawless.",
    author: "Sarah K., Senior Developer",
    role: "Tech Lead at InnovateCo"
  },
  {
    quote: "The AI suggestions save me hours each week. It's like having a pair programmer who never sleeps.",
    author: "Miguel T.",
    role: "Full-stack Developer"
  },
  {
    quote: "I switched from VS Code and haven't looked back. The cloud sync alone is worth it.",
    author: "Priya M.",
    role: "Frontend Engineer"
  }
];

const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
        >
          <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
          <div className="text-white font-medium">{testimonial.author}</div>
          <div className="text-purple-400 text-sm">{testimonial.role}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default Testimonials;