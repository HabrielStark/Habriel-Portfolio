import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { asteroidBeltProps } from '../../utils/projectsData';

const AsteroidBelt = () => {
  const asteroids = useRef();

  const { positions, scales, rotations } = useMemo(() => {
    const positions = new Float32Array(asteroidBeltProps.count * 3);
    const scales = new Float32Array(asteroidBeltProps.count);
    const rotations = new Float32Array(asteroidBeltProps.count * 3);

    for (let i = 0; i < asteroidBeltProps.count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const radius = asteroidBeltProps.minRadius + 
        Math.random() * (asteroidBeltProps.maxRadius - asteroidBeltProps.minRadius);

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5; // Небольшой разброс по Y
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      scales[i] = asteroidBeltProps.minSize + 
        Math.random() * (asteroidBeltProps.maxSize - asteroidBeltProps.minSize);

      rotations[i * 3] = Math.random() * Math.PI;
      rotations[i * 3 + 1] = Math.random() * Math.PI;
      rotations[i * 3 + 2] = Math.random() * Math.PI;
    }

    return { positions, scales, rotations };
  }, []);

  useFrame((state) => {
    if (asteroids.current) {
      asteroids.current.rotation.y += 0.0001;
    }
  });

  return (
    <group ref={asteroids}>
      <instancedMesh args={[null, null, asteroidBeltProps.count]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={asteroidBeltProps.color}
          roughness={0.8}
          metalness={0.2}
        />
        {Array.from({ length: asteroidBeltProps.count }).map((_, i) => {
          const matrix = new THREE.Matrix4();
          matrix.setPosition(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2]
          );
          matrix.scale(new THREE.Vector3(scales[i], scales[i], scales[i]));
          matrix.makeRotationFromEuler(new THREE.Euler(
            rotations[i * 3],
            rotations[i * 3 + 1],
            rotations[i * 3 + 2]
          ));
          return matrix;
        })}
      </instancedMesh>
    </group>
  );
};

export default AsteroidBelt; 