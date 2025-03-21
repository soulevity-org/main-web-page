import React, { useState, useEffect } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();

    // Don't set up events for touch devices
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Track when cursor is over interactive elements
    const handleElementHover = () => {
      setIsHovering(true);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    // Add global event listeners
    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      // Remove all event listeners
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [isVisible, isHovering, isTouchDevice]);

  // Don't render anything on touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Main glow that follows cursor */}
      <div 
        className={`absolute rounded-full transition-all duration-150 ease-out ${
          isClicking ? 'h-48 w-48 bg-primary/40 blur-[80px]' : 
          isHovering ? 'h-72 w-72 bg-primary/25 blur-[120px]' : 
          'h-64 w-64 bg-primary/20 blur-[100px]'
        }`}
        style={{
          transform: `translate(${position.x - (isClicking ? 96 : isHovering ? 144 : 128)}px, ${position.y - (isClicking ? 96 : isHovering ? 144 : 128)}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Smaller, sharper glow for precision */}
      <div 
        className={`absolute rounded-full transition-all duration-75 ease-out ${
          isClicking ? 'h-12 w-12 bg-primary/60 blur-[10px]' : 
          isHovering ? 'h-16 w-16 bg-primary/40 blur-[15px]' : 
          'h-8 w-8 bg-primary/30 blur-[5px]'
        }`}
        style={{
          transform: `translate(${position.x - (isClicking ? 6 : isHovering ? 8 : 4)}px, ${position.y - (isClicking ? 6 : isHovering ? 8 : 4)}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
} 