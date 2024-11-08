import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SecretMessage = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 10px;
  color: #4A90E2;
  z-index: 1000;
  text-align: center;
  border: 1px solid #4A90E2;
`;

const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const ironman = ['i', 'r', 'o', 'n', 'm', 'a', 'n'];
const matrix = ['m', 'a', 't', 'r', 'i', 'x'];

export function useEasterEggs() {
  const [sequence, setSequence] = useState([]);
  const [showSecret, setShowSecret] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = [...sequence, e.key];
      
      // Keep only the last N keys pressed, where N is the longest code
      if (newSequence.length > konami.length) {
        newSequence.shift();
      }
      
      setSequence(newSequence);

      // Check for Konami code
      if (newSequence.join('') === konami.join('')) {
        setShowSecret('You found the Konami code! Unlocked: Matrix Rain Background');
        document.body.classList.add('matrix-background');
      }
      
      // Check for Iron Man code
      if (newSequence.join('').includes(ironman.join(''))) {
        setShowSecret('JARVIS: "At your service, sir!"');
      }
      
      // Check for Matrix code
      if (newSequence.join('').includes(matrix.join(''))) {
        setShowSecret('Wake up, Neo...');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence]);

  useEffect(() => {
    if (showSecret) {
      const timer = setTimeout(() => {
        setShowSecret('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSecret]);

  return (
    <AnimatePresence>
      {showSecret && (
        <SecretMessage
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {showSecret}
        </SecretMessage>
      )}
    </AnimatePresence>
  );
} 