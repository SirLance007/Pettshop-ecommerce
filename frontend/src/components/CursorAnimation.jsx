import React, { useEffect, useState } from 'react';
import { FaPaw } from 'react-icons/fa';

const CursorAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [pawPrints, setPawPrints] = useState([]);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add new paw print with timestamp
      const newPawPrint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
        timestamp: Date.now()
      };
      setPawPrints(prev => [...prev, newPawPrint].slice(-5));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Cleanup old paw prints every 100ms
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setPawPrints(prev => prev.filter(paw => now - paw.timestamp < 1000)); // Remove prints older than 1 second
    }, 100);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <>
      {/* Main cursor paw */}
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <FaPaw 
          className="text-pet-brown/40 animate-bounce-gentle" 
          style={{ 
            fontSize: '24px',
            filter: 'drop-shadow(0 0 2px rgba(139, 69, 19, 0.3))'
          }} 
        />
      </div>

      {/* Trail of paw prints */}
      {pawPrints.map((paw, index) => {
        const age = Date.now() - paw.timestamp;
        const opacity = Math.max(0, 0.4 - (age / 1000) * 0.4); // Fade from 0.4 to 0 over 1 second

        return (
          <div
            key={paw.id}
            className="fixed pointer-events-none z-40 transition-opacity duration-300"
            style={{
              left: `${paw.x}px`,
              top: `${paw.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity,
            }}
          >
            <FaPaw 
              className="text-pet-brown/30" 
              style={{ 
                fontSize: '16px',
                transform: `rotate(${index * 15}deg)`,
                filter: 'drop-shadow(0 0 1px rgba(139, 69, 19, 0.2))'
              }} 
            />
          </div>
        );
      })}
    </>
  );
};

export default CursorAnimation; 