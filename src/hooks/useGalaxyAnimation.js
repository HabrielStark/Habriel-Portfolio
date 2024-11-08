import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function useGalaxyAnimation(speed = 0.001) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed;
      
      // Add subtle wobble
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return groupRef;
} 