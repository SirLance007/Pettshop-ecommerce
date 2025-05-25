import React, { useEffect, useState } from 'react';
import { FaPaw } from 'react-icons/fa';

const CursorAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [pawPrints, setPawPrints] = useState([]);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useEffect(() => {
    const updatePosition = (e) => {
      const currentTime = Date.now();
      // Only update if enough time has passed (throttling)
      if (currentTime - lastUpdateTime > 50) { // 50ms throttle
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
        setLastUpdateTime(currentTime);

        // Add new paw print with timestamp and randomized rotation
        const newPawPrint = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
          timestamp: Date.now(),
          rotation: Math.random() * 360, // Random rotation for each paw print
          scale: 0.8 + Math.random() * 0.4 // Random scale between 0.8 and 1.2
        };
        setPawPrints(prev => [...prev, newPawPrint].slice(-5));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Cleanup old paw prints every 100ms
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setPawPrints(prev => prev.filter(paw => now - paw.timestamp < 2000)); // Keep prints for 2 seconds
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
  }, [lastUpdateTime]);

  return (
    <>
      {/* Main cursor paw */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67), left 0.15s ease-out, top 0.15s ease-out'
        }}
      >
        <FaPaw 
          className="text-pet-brown/40 animate-bounce-gentle" 
          style={{ 
            fontSize: '24px',
            filter: 'drop-shadow(0 0 2px rgba(139, 69, 19, 0.3))',
            transform: 'rotate(-45deg)',
            transition: 'transform 0.3s ease-out'
          }} 
        />
      </div>

      {/* Trail of paw prints */}
      {pawPrints.map((paw, index) => {
        const age = Date.now() - paw.timestamp;
        const opacity = Math.max(0, 0.4 - (age / 2000) * 0.4); // Fade from 0.4 to 0 over 2 seconds
        const scale = paw.scale * (1 - age / 2000 * 0.3); // Gradually reduce scale

        return (
          <div
            key={paw.id}
            className="fixed pointer-events-none z-40 transition-all duration-500 ease-out"
            style={{
              left: `${paw.x}px`,
              top: `${paw.y}px`,
              transform: `translate(-50%, -50%) rotate(${paw.rotation}deg) scale(${scale})`,
              opacity,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <FaPaw 
              className="text-pet-brown/30" 
              style={{ 
                fontSize: '16px',
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