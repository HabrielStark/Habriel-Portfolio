export const projects = [
  {
    id: 1,
    name: "IT Consulting",
    description: "Modern IT consulting website with sleek design and professional services presentation.",
    url: "https://ne0ntech.netlify.app/",
    orbit: {
      radius: 5,
      speed: 0.5,
      initialAngle: 0
    },
    planetProps: {
      size: 1.2,
      textureType: 'tech',
      hasProject: true
    }
  },
  {
    id: 2,
    name: "Premium Law Firm",
    description: "Elegant law firm website showcasing legal services with a premium feel.",
    url: "https://premium-law-firm.netlify.app/",
    orbit: {
      radius: 8,
      speed: 0.4,
      initialAngle: Math.PI / 3
    },
    planetProps: {
      size: 1.4,
      textureType: 'crystal',
      hasProject: true
    }
  },
  {
    id: 3,
    name: "Romantic Gifts",
    description: "E-commerce platform for romantic gifts and presents.",
    url: "https://romanticgifts.vercel.app/",
    orbit: {
      radius: 11,
      speed: 0.3,
      initialAngle: Math.PI / 2
    },
    planetProps: {
      size: 1.3,
      textureType: 'plasma',
      hasProject: true
    }
  },
  {
    id: 4,
    name: "Multi-vacation",
    description: "Travel and vacation planning platform with multiple destinations.",
    url: "https://one-ten-gamma.vercel.app/",
    orbit: {
      radius: 14,
      speed: 0.25,
      initialAngle: Math.PI
    },
    planetProps: {
      size: 1.5,
      textureType: 'quantum',
      hasProject: true
    }
  },
  {
    id: 5,
    name: "Agency Portfolio",
    description: "Creative agency portfolio showcasing works and services.",
    url: "https://habriel.vercel.app/",
    orbit: {
      radius: 17,
      speed: 0.2,
      initialAngle: Math.PI * 4/3
    },
    planetProps: {
      size: 1.6,
      textureType: 'nebula',
      hasProject: true
    }
  },
  {
    id: 6,
    name: "Medicine Website",
    description: "Healthcare and medical services information platform.",
    url: "https://medecinewebsite1.netlify.app/",
    orbit: {
      radius: 20,
      speed: 0.15,
      initialAngle: Math.PI * 5/3
    },
    planetProps: {
      size: 1.4,
      textureType: 'toxic',
      hasProject: true
    }
  },
  {
    id: 7,
    name: "Tech Conference",
    description: "Technology conference and events platform.",
    url: "https://techconf2024.netlify.app/",
    orbit: {
      radius: 23,
      speed: 0.1,
      initialAngle: Math.PI * 2
    },
    planetProps: {
      size: 1.5,
      textureType: 'holographic',
      hasProject: true
    }
  }
];

export const sunProps = {
  size: 4,
  color: '#FDB813',
  emissiveColor: '#FF4500',
  emissiveIntensity: 2,
  coronaColor: '#FFD700',
  coronaSize: 3.2,
  flareIntensity: 3,
  rotationSpeed: 0.001
};

export const asteroidBeltProps = {
  count: 200,
  minRadius: 2.5,
  maxRadius: 3.5,
  minSize: 0.02,
  maxSize: 0.08,
  color: '#808080'
}; 