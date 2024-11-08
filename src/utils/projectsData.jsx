export const sunProps = {
  size: 3,
  color: '#FDB813',
  emissiveColor: '#FDB813',
  emissiveIntensity: 4,
  coronaColor: '#FFD700',
  coronaSize: 3.2,
  flareIntensity: 3,
  rotationSpeed: 0.002
};

export const asteroidBeltProps = {
  count: 200,
  minRadius: 3.5,
  maxRadius: 4.5,
  minSize: 0.02,
  maxSize: 0.08,
  color: '#808080'
};

export const starFieldProps = {
  count: 2000,
  depth: 100,
  size: 0.1,
  color: '#FFFFFF'
};

export const spaceDustProps = {
  count: 1000,
  size: 0.02,
  color: '#4169E1',
  spread: 20
};

export const cometsProps = {
  count: 5,
  tailLength: 2,
  color: '#00FFFF',
  speed: 0.1
};

export const projects = [
  {
    id: 1,
    name: "Tech Core",
    description: "Advanced technological core system with AI integration.",
    type: "planet",
    color: "#00ff87",
    orbit: {
      radius: 6,
      speed: 0.4,
      initialAngle: 0
    },
    planetProps: {
      size: 0.9,
      textureType: 'tech',
      rotationSpeed: 0.02,
      atmosphereColor: '#00ff87'
    }
  },
  {
    id: 2,
    name: "Crystal Nexus",
    description: "Crystalline data storage and processing center.",
    type: "planet",
    color: "#ff00ff",
    orbit: {
      radius: 8,
      speed: 0.35,
      initialAngle: Math.PI / 4
    },
    planetProps: {
      size: 1.1,
      textureType: 'crystal',
      rotationSpeed: 0.015,
      atmosphereColor: '#ff00ff'
    }
  },
  {
    id: 3,
    name: "Romantic Gifts",
    description: "A romantic gifts website offering personalized and heartfelt gift options.",
    type: "planet",
    color: "#ff0055",
    url: "https://your-romantic-gifts-url.com",
    background: "hearts",
    orbit: {
      radius: 10,
      speed: 0.25,
      initialAngle: Math.PI / 3
    },
    planetProps: {
      size: 0.9,
      textureType: 'plasma',
      rotationSpeed: 0.025,
      atmosphereColor: '#ff0055'
    }
  },
  {
    id: 4,
    name: "Multi-Vacation",
    description: "Versatile vacation planning website with seasonal packages.",
    type: "planet",
    color: "#00ffff",
    url: "https://your-vacation-url.com",
    background: "seasons",
    orbit: {
      radius: 12,
      speed: 0.2,
      initialAngle: Math.PI / 2
    },
    planetProps: {
      size: 1.1,
      textureType: 'ice',
      rotationSpeed: 0.018,
      atmosphereColor: '#00ffff'
    }
  },
  {
    id: 5,
    name: "Agency Portfolio",
    description: "Professional portfolio website showcasing agency projects.",
    type: "planet",
    color: "#7700ff",
    url: "https://your-agency-url.com",
    background: "portfolio",
    orbit: {
      radius: 14,
      speed: 0.15,
      initialAngle: Math.PI * 1.5
    },
    planetProps: {
      size: 1.3,
      textureType: 'nebula',
      rotationSpeed: 0.012,
      atmosphereColor: '#7700ff'
    }
  },
  {
    id: 6,
    name: "Medicine",
    description: "Comprehensive medical website providing healthcare services.",
    type: "planet",
    color: "#00ff55",
    url: "https://your-medical-url.com",
    background: "medical",
    orbit: {
      radius: 16,
      speed: 0.1,
      initialAngle: Math.PI * 1.8
    },
    planetProps: {
      size: 1.0,
      textureType: 'toxic',
      rotationSpeed: 0.022,
      atmosphereColor: '#00ff55'
    }
  },
  {
    id: 7,
    name: "Tech Conference",
    description: "2024 tech conference website featuring speaker profiles.",
    type: "planet",
    color: "#ff3300",
    url: "https://your-conference-url.com",
    background: "tech",
    orbit: {
      radius: 18,
      speed: 0.08,
      initialAngle: Math.PI * 2
    },
    planetProps: {
      size: 1.4,
      textureType: 'lava',
      rotationSpeed: 0.01,
      atmosphereColor: '#ff3300'
    }
  },
  {
    id: 8,
    name: "AI Research Lab",
    description: "Advanced artificial intelligence research laboratory interface.",
    type: "planet",
    color: "#00ffaa",
    url: "https://your-ai-lab-url.com",
    background: "quantum-plasma",
    orbit: {
      radius: 20,
      speed: 0.06,
      initialAngle: Math.PI * 2.2
    },
    planetProps: {
      size: 1.5,
      textureType: 'quantum-plasma',
      rotationSpeed: 0.015,
      atmosphereColor: '#00ffaa'
    }
  },
  {
    id: 9,
    name: "Holographic Interface",
    description: "Next-gen holographic user interface with advanced visualization.",
    type: "planet",
    color: "#00eeff",
    url: "https://your-holographic-url.com",
    background: "holographic",
    orbit: {
      radius: 22,
      speed: 0.04,
      initialAngle: Math.PI * 2.4
    },
    planetProps: {
      size: 1.6,
      textureType: 'holographic',
      rotationSpeed: 0.008,
      atmosphereColor: '#00eeff'
    }
  },
  {
    id: 10,
    name: "Biomech Interface",
    description: "Organic-mechanical hybrid interface with living circuits.",
    type: "planet",
    color: "#ff00aa",
    url: "https://your-biomech-url.com",
    background: "biomech",
    orbit: {
      radius: 24,
      speed: 0.02,
      initialAngle: Math.PI * 2.6
    },
    planetProps: {
      size: 1.7,
      textureType: 'biomech',
      rotationSpeed: 0.006,
      atmosphereColor: '#ff00aa'
    }
  },
  {
    id: 11,
    name: "Neural Network",
    description: "Advanced neural network visualization and processing interface.",
    type: "planet",
    color: "#ff00cc",
    url: "https://your-neural-url.com",
    background: "neural",
    orbit: {
      radius: 26,
      speed: 0.01,
      initialAngle: Math.PI * 2.8
    },
    planetProps: {
      size: 1.8,
      textureType: 'neural',
      rotationSpeed: 0.004,
      atmosphereColor: '#ff00cc'
    }
  },
  {
    id: 12,
    name: "Crystal Plasma Core",
    description: "Hybrid crystal-plasma processing core with quantum effects.",
    type: "planet",
    color: "#ff1493",
    url: "https://your-crystal-plasma-url.com",
    background: "crystal-plasma",
    orbit: {
      radius: 28,
      speed: 0.008,
      initialAngle: Math.PI * 3.0
    },
    planetProps: {
      size: 1.9,
      textureType: 'crystal-plasma',
      rotationSpeed: 0.003,
      atmosphereColor: '#ff1493'
    }
  }
];

export const visualEffects = {
  bloom: {
    enabled: true,
    strength: 0.5,
    radius: 0.4,
    threshold: 0.8
  },
  godRays: {
    enabled: true,
    decay: 0.95,
    density: 0.8,
    weight: 0.6
  },
  spaceDistortion: {
    enabled: true,
    strength: 0.3,
    scale: 1.5,
    speed: 0.2
  }
};

export const projectTypes = {
  star: {
    geometry: "SphereGeometry",
    material: "MeshStandardMaterial",
    size: 1.2,
    emission: true
  },
  planet: {
    geometry: "SphereGeometry", 
    material: "MeshPhongMaterial",
    size: 1,
    emission: false
  }
};

export const planetTextures = {
  earth: '/textures/earth.jpg',
  marble: '/textures/marble.jpg',
  crystal: '/textures/crystal.jpg',
  ocean: '/textures/ocean.jpg',
  lava: '/textures/lava.jpg',
  ice: '/textures/ice.jpg',
  tech: '/textures/tech.jpg'
}; 