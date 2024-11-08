import React, { useMemo } from 'react';
import * as THREE from 'three';

const SpaceDebris = () => {
  const debris = useMemo(() => {
    const temp = [];
    for(let i = 0; i < 100; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        ),
        rotation: Math.random() * Math.PI,
        size: Math.random() * 0.1 + 0.05
      });
    }
    return temp;
  }, []);

  return debris.map((d, i) => (
    <mesh key={i} position={d.position} rotation-y={d.rotation}>
      <dodecahedronGeometry args={[d.size]} />
      <meshStandardMaterial color="#666666" roughness={0.8} />
    </mesh>
  ));
};

export default SpaceDebris; 