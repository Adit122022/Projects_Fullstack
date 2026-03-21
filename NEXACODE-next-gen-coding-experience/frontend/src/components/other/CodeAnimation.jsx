import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const codeSnippets = [
  {
    code: `function greet() {\n  console.log("Hello, NEXACODE!");\n}`,
    language: 'javascript',
    highlight: [2]
  },
  {
    code: `const App = () => {\n  return (\n    <div className="nexacode">\n      <h1>Welcome</h1>\n    </div>\n  );\n}`,
    language: 'jsx',
    highlight: [3]
  },
  {
    code: `class Developer {\n  constructor(name) {\n    this.name = name;\n    this.editor = 'NEXACODE';\n  }\n\n  code() {\n    console.log(\`\${this.name} loves \${this.editor}\`);\n  }\n}`,
    language: 'javascript',
    highlight: [3, 7]
  },
  {
    code: `// NEXACODE: Next-gen editor\nconst run = async () => {\n  try {\n    const result = await compile();\n    display(result);\n  } catch (error) {\n    debug(error);\n  }\n}`,
    language: 'javascript',
    highlight: [3, 6]
  }
];

const CodeAnimation = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showLanguage, setShowLanguage] = useState(false);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet].code;
    let timer;

    if (isTyping) {
      // Typing effect
      if (displayedCode.length < snippet.length) {
        timer = setTimeout(() => {
          setDisplayedCode(snippet.substring(0, displayedCode.length + 1));
        }, Math.random() * 30 + 20); // Random typing speed for more natural feel
      } else {
        setIsTyping(false);
        setShowLanguage(true);
        timer = setTimeout(() => {
          setShowLanguage(false);
          setIsTyping(false);
        }, 2500);
      }
    } else {
      // Deleting effect
      if (displayedCode.length > 0) {
        timer = setTimeout(() => {
          setDisplayedCode(snippet.substring(0, displayedCode.length - 1));
        }, 10 + Math.random() * 20); // Random deleting speed
      } else {
        setIsTyping(true);
        setCurrentSnippet((currentSnippet + 1) % codeSnippets.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedCode, currentSnippet, isTyping]);

  // Syntax highlighting helper
  const renderHighlightedCode = () => {
    const lines = displayedCode.split('\n');
    const { highlight } = codeSnippets[currentSnippet];
    
    return lines.map((line, i) => {
      const isHighlighted = highlight.includes(i + 1);
      return (
        <div 
          key={i} 
          className={`flex ${isHighlighted ? 'bg-blue-900/30' : ''}`}
        >
          <span className="text-gray-500 select-none mr-4 w-6 text-right">
            {i + 1}
          </span>
          <code className={isHighlighted ? 'text-yellow-300' : 'text-green-400'}>
            {line || '\u00A0'}
          </code>
        </div>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700"
    >
      {/* Window Header */}
      <motion.div 
        className="flex justify-between items-center p-3 bg-gray-800"
        whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
      >
        <div className="flex space-x-2">
          <motion.div 
            className="w-3 h-3 rounded-full bg-red-500"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-yellow-500"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-green-500"
            whileHover={{ scale: 1.2 }}
          />
        </div>
        
        <AnimatePresence>
          {showLanguage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-xs font-mono text-gray-400 px-2 py-1 bg-gray-700 rounded"
            >
              {codeSnippets[currentSnippet].language}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="text-xs text-gray-500">nexacode.js</div>
      </motion.div>

      {/* Code Display */}
      <div className="p-4 font-mono text-sm md:text-base overflow-auto max-h-96">
        <div className="whitespace-pre">
          {renderHighlightedCode()}
        </div>
        
        {/* Cursor */}
        {isTyping && (
          <motion.span
            className="inline-block w-2 h-5 bg-green-400 ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
      </div>

      {/* Status Bar */}
      <motion.div 
        className="flex justify-between items-center px-3 py-1 bg-gray-800 text-xs text-gray-400"
        whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.95)' }}
      >
        <div>Ln {displayedCode.split('\n').length}, Col {displayedCode.split('\n').pop().length + 1}</div>
        <div className="flex space-x-4">
          <motion.span whileHover={{ color: '#ffffff' }}>UTF-8</motion.span>
          <motion.span whileHover={{ color: '#ffffff' }}>JavaScript</motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodeAnimation;