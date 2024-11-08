import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function MITLogo3D() {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
    groupRef.current.rotation.x = Math.cos(time * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[-2, 0, 0]}
        fontSize={1.5}
        color="#e62429"
        anchorX="center"
        anchorY="middle"
      >
        MIT
        <meshStandardMaterial
          color="#e62429"
          metalness={0.8}
          roughness={0.2}
        />
      </Text>
      <mesh position={[0, 0, -2]} scale={[4, 4, 0.1]}>
        <planeGeometry />
        <meshStandardMaterial
          color="#000000"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

export default MITLogo3D; 