import { useMemo } from 'react';
import * as THREE from 'three';

const OrbitLine = ({ radius }) => {
  const points = useMemo(() => {
    const segments = 64;
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(theta) * radius,
          0,
          Math.sin(theta) * radius
        )
      );
    }
    return points;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(50)
    );
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial 
        attach="material" 
        color="#ffffff" 
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
};

export default OrbitLine; 