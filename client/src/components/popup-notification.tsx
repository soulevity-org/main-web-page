import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface PopupNotificationProps {
  delay?: number; // Delay in ms before showing
}

export default function PopupNotification({ delay = 1000 }: PopupNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we need to show the popup on this page reload
    // We will use a timestamp to detect when the page was actually reloaded
    // vs just navigating between pages in the SPA
    
    const pageLoadTimestamp = sessionStorage.getItem('pageLoadTimestamp');
    const currentTimestamp = Date.now().toString();
    
    // On a full page reload, pageLoadTimestamp will be null because sessionStorage is preserved
    // but our React component mounts from scratch
    if (!pageLoadTimestamp) {
      // This is a fresh page load (not an SPA navigation)
      sessionStorage.setItem('pageLoadTimestamp', currentTimestamp);
      
      // Show the popup after the specified delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
    
    // Update the timestamp on component mount but don't show popup for SPA navigation
    sessionStorage.setItem('pageLoadTimestamp', currentTimestamp);
    
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100%-2rem)] max-w-sm sm:max-w-md md:max-w-lg lg:w-96 bg-background/95 shadow-xl rounded-lg overflow-hidden border border-primary/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <div className="p-3 sm:p-4 md:p-5">
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-foreground">Development Notice</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary"
                onClick={handleClose}
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            
            <motion.p 
              className="text-muted-foreground text-xs sm:text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              The platform is still in development. Expect things to not work. Stay tuned!
            </motion.p>
            
            <motion.div 
              className="mt-3 sm:mt-4 md:mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href="https://discord.gg/x6qnnguCgj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base"
              >
                <span>Join our Discord</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5 
                  }}
                >
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                </motion.div>
              </a>
            </motion.div>
          </div>
          
          {/* Animated border highlight */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 10 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 