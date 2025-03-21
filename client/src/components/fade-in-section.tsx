import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  distance?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function FadeInSection({
  children,
  direction = 'up',
  delay = 0,
  distance = 50,
  threshold = 0.1,
  className = '',
  once = true,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Set up the initial animation properties based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };
  
  useEffect(() => {
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If once is true, unobserve after it becomes visible
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // If once is false, set back to invisible when out of viewport
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold,
      }
    );
    
    // Start observing the section
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    // Cleanup observer on component unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once, threshold]);
  
  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay * 0.1,
        ease: [0.25, 0.1, 0.25, 1], // Custom ease curve
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
} 