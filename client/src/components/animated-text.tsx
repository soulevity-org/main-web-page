import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  highlightWords?: string[];
  highlightColor?: string;
  centered?: boolean;
}

export default function AnimatedText({
  text,
  className,
  as: Component = 'p',
  delay = 0,
  highlightWords = [],
  highlightColor = 'text-primary',
  centered = true
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 50);

    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(' ');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.04 * i
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Add heading-specific styling
  const isHeading = Component === 'h1' || Component === 'h2' || Component === 'h3' || 
                   Component === 'h4' || Component === 'h5' || Component === 'h6';

  return (
    <Component className={cn(isHeading ? "pb-2" : "", className)}>
      <motion.div
        style={{ 
          overflow: 'hidden', 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: centered ? 'center' : 'flex-start',
          paddingBottom: '0.25rem', // Extra padding to prevent text cut-off
        }}
        variants={container}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className={centered ? "mx-auto text-center" : ""}
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            style={{ 
              marginRight: '0.25em',
              marginBottom: '0.15em', // Add margin bottom to each word
            }}
            key={index}
            className={highlightWords.includes(word) ? highlightColor : ''}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </Component>
  );
} 