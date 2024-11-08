import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const WarpContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
`;

const WarpCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const WarpOverlay = styled(motion.div)`
  position: absolute;
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
`;

const WarpDrive = ({ isActive, onComplete }) => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const timeRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 50;

    // Создаем частицы для эффекта варпа
    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Позиции
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      // Скорости
      velocities[i3] = (Math.random() - 0.5) * 0.2;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.2;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

      // Цвета
      colors[i3] = Math.random() * 0.5 + 0.5;
      colors[i3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i3 + 2] = 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    if (isActive && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      timeRef.current = 0;
      animate();
    }
  }, [isActive]);

  const animate = () => {
    if (!isAnimatingRef.current) return;

    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const particles = particlesRef.current;

    timeRef.current += 0.016; // ~60fps

    // Анимация частиц
    const positions = particles.geometry.attributes.position.array;
    const colors = particles.geometry.attributes.color.array;

    for (let i = 0; i < positions.length; i += 3) {
      // Движение частиц
      positions[i + 2] += (Math.random() - 0.5) * 2;
      
      // Возвращаем частицы в начальное положение
      if (positions[i + 2] > 100) positions[i + 2] = -100;
      if (positions[i + 2] < -100) positions[i + 2] = 100;

      // Пульсация цвета
      const pulseIntensity = (Math.sin(timeRef.current * 2) + 1) * 0.5;
      colors[i] = Math.min(1, colors[i] + pulseIntensity * 0.1);
      colors[i + 1] = Math.min(1, colors[i + 1] + pulseIntensity * 0.1);
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;

    // Вращение камеры
    camera.rotation.z += 0.001;
    
    renderer.render(scene, camera);

    if (timeRef.current < 2) {
      requestAnimationFrame(animate);
    } else {
      isAnimatingRef.current = false;
      onComplete?.();
    }
  };

  return (
    <WarpContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <WarpCanvas ref={canvasRef} />
      <WarpOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </WarpContainer>
  );
};

export default WarpDrive; 