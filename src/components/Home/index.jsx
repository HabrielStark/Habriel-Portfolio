import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000;
`;

const BackgroundCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  margin: 0;
  background: linear-gradient(45deg, #00ffff, #00ff87);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffff, transparent);
    transform: scaleX(0);
    animation: lineReveal 1s ease forwards 1s;
  }

  @keyframes lineReveal {
    to {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.8rem;
  margin: 2rem 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
`;

const StyledLink = styled(Link)`
  padding: 1.2rem 2.5rem;
  border: 2px solid #00ffff;
  border-radius: 30px;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 1px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(0, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 30px;
    background: linear-gradient(45deg, #00ffff, #00ff87);
    z-index: -1;
    opacity: 0;
    transition: 0.3s;
  }

  &:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    
    &:before {
      left: 100%;
    }
    
    &:after {
      opacity: 0.3;
    }
  }
`;

const Rocket = styled(motion.div)`
  position: fixed;
  width: 200px;
  height: 200px;
  z-index: 9999;
  pointer-events: none;
`;

const RocketTrail = styled(motion.div)`
  position: fixed;
  width: 100px;
  height: 20px;
  background: linear-gradient(90deg, 
    rgba(0, 255, 255, 0) 0%,
    rgba(0, 255, 255, 0.5) 50%,
    rgba(0, 255, 255, 0) 100%
  );
  filter: blur(4px);
  z-index: 9998;
`;

const WarpEffect = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center,
    transparent 0%,
    rgba(0, 255, 255, 0.1) 20%,
    rgba(0, 255, 255, 0.2) 40%,
    rgba(0, 0, 0, 0.8) 80%
  );
  pointer-events: none;
  z-index: 9997;
`;

const RocketSVG = () => (
  <svg viewBox="0 0 300 400" width="100%" height="100%">
    <path d="M150 50 L200 280 L150 300 L100 280 L150 50" fill="#00ffff"/>
    <path d="M150 50 L200 280 L150 300 Z" fill="#00cccc"/>
    <circle cx="150" cy="150" r="20" fill="#90CAF9"/>
    <circle cx="150" cy="150" r="15" fill="#E1F5FE"/>
    <path d="M100 280 L60 340 L100 320 Z" fill="#00cccc"/>
    <path d="M200 280 L240 340 L200 320 Z" fill="#009999"/>
    <path d="M150 50 L170 100 L150 120 L130 100 Z" fill="#009999"/>
    <path d="M130 300 L150 320 L170 300 L170 310 L150 330 L130 310 Z" fill="#009999"/>
    
    <motion.path
      d="M140 330 L150 380 L160 330"
      fill="#FF5722"
      animate={{
        d: [
          "M140 330 L150 380 L160 330",
          "M140 330 L150 400 L160 330",
          "M140 330 L150 380 L160 330"
        ],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.path
      d="M145 330 L150 360 L155 330"
      fill="#FFC107"
      animate={{
        d: [
          "M145 330 L150 360 L155 330",
          "M145 330 L150 375 L155 330",
          "M145 330 L150 360 L155 330"
        ],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </svg>
);

const BackgroundEffect = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at center, 
    rgba(0, 255, 255, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 1;
`;

const GridLines = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: 
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px) 0 0 / 50px 50px,
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px) 0 0 / 50px 50px;
  pointer-events: none;
  z-index: 1;
`;

const FloatingParticles = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(0, 255, 255, 0.5);
  border-radius: 50%;
`;

const Home = () => {
  const navigate = useNavigate();
  const [isLaunching, setIsLaunching] = useState(false);
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Создаем частицы
    const newParticles = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1
    }));
    setParticles(newParticles);

    // Обработчик движения мыши
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    
    const projectsLink = document.querySelector('a[href="/projects"]');
    if (!projectsLink) return;

    const rect = projectsLink.getBoundingClientRect();
    
    // Установим начальную позицию ракеты
    setRocketPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight - 200
    });

    // Установим целевую позицию
    setTargetPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });

    setIsLaunching(true);

    // Задержка перед переходом
    setTimeout(() => {
      navigate('/projects');
    }, 2000);
  };

  return (
    <HomeContainer>
      <BackgroundEffect
        animate={{
          background: [
            'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle at center, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <GridLines
        style={{
          transform: `translate(
            ${(mousePosition.x - window.innerWidth / 2) * 0.02}px,
            ${(mousePosition.y - window.innerHeight / 2) * 0.02}px
          )`
        }}
      />
      <FloatingParticles>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            initial={{ x: particle.x, y: particle.y }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y + (Math.random() - 0.5) * 100,
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: particle.size,
              height: particle.size
            }}
          />
        ))}
      </FloatingParticles>
      
      <Content>
        <Title>Welcome to My Universe</Title>
        <Subtitle>Full-Stack Developer & Creative Technologist</Subtitle>
        <ButtonContainer>
          <StyledLink
            to="/projects"
            onClick={handleExploreClick}
          >
            Explore Projects
          </StyledLink>
        </ButtonContainer>
      </Content>

      <AnimatePresence>
        {isLaunching && (
          <>
            <RocketTrail
              initial={{
                x: rocketPosition.x,
                y: rocketPosition.y + 100,
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: targetPosition.x,
                y: targetPosition.y + 100,
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            />
            <Rocket
              initial={{ 
                x: rocketPosition.x - 100,
                y: rocketPosition.y,
                scale: 0,
                rotate: -90
              }}
              animate={{
                x: targetPosition.x - 100,
                y: targetPosition.y,
                scale: [0, 1, 1, 0],
                rotate: -90
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1]
              }}
            >
              <RocketSVG />
            </Rocket>
            <WarpEffect
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.2, 1.5]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          </>
        )}
      </AnimatePresence>
    </HomeContainer>
  );
};

export default Home; 