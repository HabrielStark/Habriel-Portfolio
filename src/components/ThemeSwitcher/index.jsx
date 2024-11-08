import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGlobal } from '../../context/GlobalContext';

const SwitchContainer = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid ${props => props.theme.primary};
  border-radius: 30px;
  padding: 10px 20px;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 100;
  cursor: pointer;
  
  &:hover {
    background: rgba(74, 144, 226, 0.2);
  }
`;

const Icon = styled(motion.div)`
  width: 20px;
  height: 20px;
`;

function ThemeSwitcher() {
  const { theme, setTheme } = useGlobal();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <SwitchContainer
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </Icon>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </SwitchContainer>
  );
}

export default ThemeSwitcher; 