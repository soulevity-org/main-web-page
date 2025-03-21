import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,40,40,0.2),transparent_50%)]" />
      </div>
      
      {/* Static glow elements */}
      <motion.div 
        className="absolute h-56 w-56 bg-primary/30 blur-[100px]" 
        style={{left: '20%', top: '30%'}}
        initial={{ opacity: 0.5, x: -30 }}
        animate={{ 
          opacity: [0.2, 0.3, 0.2],
          x: [-10, 10, -10]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute h-56 w-56 bg-primary/20 blur-[100px]" 
        style={{left: '70%', top: '20%'}}
        initial={{ opacity: 0.3, y: -20 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          y: [-10, 10, -10]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute h-56 w-56 bg-primary/20 blur-[100px]" 
        style={{left: '50%', top: '60%'}}
        initial={{ opacity: 0.3, x: 10 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          x: [10, -10, 10]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
    </div>
  );
} 