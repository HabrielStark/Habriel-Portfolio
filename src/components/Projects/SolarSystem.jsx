import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import Planet from './Planet';
import Sun from './Sun';
import { projects } from '../../utils/projectsData';
import styled from 'styled-components';
import OrbitLine from './OrbitLine';
import AsteroidBelt from './AsteroidBelt';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #090a0f 0%, #000000 100%);
  position: relative;
`;

const ProjectInfo = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  padding: 1.5rem 2.5rem;
  border-radius: 4px;
  color: #e0e0e0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.05),
              inset 0 0 20px rgba(0, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'all' : 'none'};
  max-width: 500px;
  text-align: left;

  &:hover {
    border: 1px solid rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.1),
                inset 0 0 30px rgba(0, 255, 255, 0.1);
  }

  h3 {
    margin: 0 0 1rem 0;
    color: #00ffff;
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #b0b0b0;
    font-weight: 300;
  }

  .buttons-container {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  button {
    padding: 0.7rem 1.5rem;
    background: transparent;
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 2px;
    color: #00ffff;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;

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

    &:hover {
      background: rgba(0, 255, 255, 0.1);
      border-color: rgba(0, 255, 255, 0.5);
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);

      &:before {
        left: 100%;
      }
    }

    &.back-button {
      border-color: rgba(255, 255, 255, 0.2);
      color: #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.5s ease;
  opacity: ${props => props.$isLoading ? 1 : 0};
  pointer-events: ${props => props.$isLoading ? 'all' : 'none'};
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: ${props => props.$progress}%;
    height: 100%;
    background: #00ffff;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 2px;
    transition: width 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
`;

const LoadingText = styled.div`
  color: #00ffff;
  font-size: 1.5rem;
  margin-top: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const LoadingPercent = styled.div`
  color: #00ffff;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-family: monospace;
`;

const InstructionTooltip = styled(motion.div)`
  position: fixed;
  top: 80px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  color: #00ffff;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #00ffff;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 255, 255, 0);
    }
  }
`;

const SolarSystem = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const controlsRef = useRef();
  const cameraRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (project) => {
    if (!project || !project.orbit) return;
    
    setSelectedProject(project);
    
    // Вычисляем позицию планеты
    const angle = project.orbit.initialAngle + Date.now() * 0.001 * project.orbit.speed;
    const x = Math.cos(angle) * project.orbit.radius;
    const z = Math.sin(angle) * project.orbit.radius;
    
    if (controlsRef.current && cameraRef.current) {
      // Отключаем автоматическое вращение
      controlsRef.current.autoRotate = false;
      
      // Анимируем камеру к планете
      gsap.to(controlsRef.current.target, {
        x: x,
        y: 0,
        z: z,
        duration: 2,
        ease: "power2.inOut"
      });

      // Приближаем камеру
      gsap.to(cameraRef.current.position, {
        x: x * 1.5,
        y: 2,
        z: z * 1.5,
        duration: 2,
        ease: "power2.inOut"
      });
    }
  };

  const handleVisitProject = () => {
    if (selectedProject?.url) {
      window.open(selectedProject.url, '_blank');
    }
  };

  const resetView = () => {
    setSelectedProject(null);
    
    if (controlsRef.current && cameraRef.current) {
      // Возвращаем камеру в исходное положение
      gsap.to(controlsRef.current.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power2.inOut"
      });

      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 10,
        z: 25,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          controlsRef.current.autoRotate = true;
        }
      });
    }
  };

  return (
    <CanvasContainer>
      <LoadingScreen $isLoading={isLoading}>
        <LoadingText>Loading Solar System...</LoadingText>
      </LoadingScreen>

      <InstructionTooltip
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Click on a planet to explore project
        <span style={{ fontSize: '0.8em', opacity: 0.8 }}>Glowing planets have projects</span>
      </InstructionTooltip>

      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0, 15, 30]}
            fov={60}
          />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} />
          
          <Stars 
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          {projects.map((project) => project.orbit && (
            <OrbitLine 
              key={`orbit-${project.id}`} 
              radius={project.orbit.radius} 
            />
          ))}
          
          <Sun />
          
          {projects.map((project) => (
            <Planet 
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
              isSelected={selectedProject?.id === project.id}
            />
          ))}
          
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={20}
            maxDistance={50}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>

      <ProjectInfo $visible={selectedProject !== null}>
        {selectedProject && (
          <>
            <h3>{selectedProject.name}</h3>
            <p>{selectedProject.description}</p>
            <div className="buttons-container">
              <button onClick={handleVisitProject}>
                Explore Project
              </button>
              <button onClick={resetView} className="back-button">
                Return to Universe
              </button>
            </div>
          </>
        )}
      </ProjectInfo>
    </CanvasContainer>
  );
};

export default SolarSystem; 