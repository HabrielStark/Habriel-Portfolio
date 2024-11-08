import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const TransitionWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const variants = {
  initial: {
    scaleX: 1,
  },
  animate: {
    scaleX: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={window.location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TransitionWrapper variants={variants} 
          style={{ transformOrigin: 'right' }}
        />
        <TransitionWrapper variants={variants}
          style={{ transformOrigin: 'left', background: '#4A90E2' }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition; 