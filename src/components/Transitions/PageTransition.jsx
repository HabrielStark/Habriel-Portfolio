import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import WarpDrive from './WarpDrive';

const TransitionContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 9998;
`;

const SpeedLines = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent 0%,
    transparent 5%,
    rgba(0, 255, 255, 0.2) 5.5%,
    transparent 6%
  );
  background-size: 200% 100%;
  filter: blur(2px);
`;

function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    if (window.location.pathname !== currentPath) {
      setIsTransitioning(true);
      setCurrentPath(window.location.pathname);
    }
  }, [window.location.pathname, currentPath]);

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={window.location.pathname}>
        <TransitionContainer>
          <SpeedLines
            initial={{ opacity: 0, backgroundPosition: "100% 0%" }}
            animate={isTransitioning ? {
              opacity: [0, 1, 0],
              backgroundPosition: ["100% 0%", "-100% 0%"]
            } : {
              opacity: 0,
              backgroundPosition: "100% 0%"
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        </TransitionContainer>
        <WarpDrive 
          isActive={isTransitioning} 
          onComplete={handleTransitionComplete}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition; 