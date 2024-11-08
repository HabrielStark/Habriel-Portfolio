import * as THREE from 'three';

// Функция для создания карты нормалей
const generateNormalMap = (ctx, heightData) => {
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = 512;
  normalCanvas.height = 512;
  const normalCtx = normalCanvas.getContext('2d');
  const normalData = normalCtx.createImageData(512, 512);

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const tl = heightData[(y - 1 + 512) % 512][(x - 1 + 512) % 512];
      const t  = heightData[(y - 1 + 512) % 512][x];
      const tr = heightData[(y - 1 + 512) % 512][(x + 1) % 512];
      const l  = heightData[y][(x - 1 + 512) % 512];
      const r  = heightData[y][(x + 1) % 512];
      const bl = heightData[(y + 1) % 512][(x - 1 + 512) % 512];
      const b  = heightData[(y + 1) % 512][x];
      const br = heightData[(y + 1) % 512][(x + 1) % 512];

      const dx = (tr + 2 * r + br - tl - 2 * l - bl) / 8;
      const dy = (bl + 2 * b + br - tl - 2 * t - tr) / 8;
      const dz = 1.0;

      const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const index = (y * 512 + x) * 4;
      normalData.data[index] = ((dx / length) + 1) * 127.5;
      normalData.data[index + 1] = ((dy / length) + 1) * 127.5;
      normalData.data[index + 2] = (dz / length) * 255;
      normalData.data[index + 3] = 255;
    }
  }

  normalCtx.putImageData(normalData, 0, 0);
  return normalCanvas;
};

// Функция для создания шумовой текстуры
const generateNoise = (intensity = 1) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(512, 512);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255 * intensity;
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

// Кэшируем сгенерированные текстуры
const textureCache = new Map();

// Обновляем функцию генерации текстур планет
export const generatePlanetTexture = (type) => {
  if (textureCache.has(type)) {
    return textureCache.get(type);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Создаем массив для хранения данных о высоте
  const heightData = Array(512).fill().map(() => Array(512).fill(0));

  switch (type) {
    case 'earth':
      // Улучшенная земля с континентами и океанами
      ctx.fillStyle = '#1E4D2B'; // Тёмно-зелёный базовый цвет
      ctx.fillRect(0, 0, 512, 512);

      // Создаем континенты
      for (let i = 0; i < 12; i++) {
        const centerX = Math.random() * 512;
        const centerY = Math.random() * 512;
        const radius = Math.random() * 100 + 50;

        // Градиент для континента
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius
        );
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(0.7, '#2E7D32');
        gradient.addColorStop(1, '#1B5E20');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Добавляем данные о высоте
        for (let y = 0; y < 512; y++) {
          for (let x = 0; x < 512; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < radius) {
              heightData[y][x] = Math.max(heightData[y][x], 1 - distance / radius);
            }
          }
        }
      }

      // Добавляем шум для деталей
      const noise = generateNoise(0.3);
      ctx.globalAlpha = 0.2;
      ctx.drawImage(noise, 0, 0);
      ctx.globalAlpha = 1;
      break;

    case 'marble':
      // Мраморная текстура с прожилками
      ctx.fillStyle = '#E0E0E0';
      ctx.fillRect(0, 0, 512, 512);

      // Создаем мраморный эффект
      for (let i = 0; i < 10; i++) {
        const gradient = ctx.createLinearGradient(
          Math.random() * 512, Math.random() * 512,
          Math.random() * 512, Math.random() * 512
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(0.5, 'rgba(200, 200, 200, 0.3)');
        gradient.addColorStop(1, 'rgba(150, 150, 150, 0.2)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, Math.random() * 512);
        
        for (let j = 0; j < 3; j++) {
          ctx.bezierCurveTo(
            Math.random() * 512, Math.random() * 512,
            Math.random() * 512, Math.random() * 512,
            Math.random() * 512, Math.random() * 512
          );
        }
        
        ctx.closePath();
        ctx.fill();
      }
      break;

    case 'crystal':
      // Кристаллическая текстура
      const crystalGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      crystalGradient.addColorStop(0, '#FF69B4');
      crystalGradient.addColorStop(0.5, '#DA70D6');
      crystalGradient.addColorStop(1, '#C71585');
      ctx.fillStyle = crystalGradient;
      ctx.fillRect(0, 0, 512, 512);

      // Добавляем кристаллические грани
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        ctx.lineWidth = Math.random() * 2;
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 60 + 20;
        
        ctx.moveTo(x, y);
        for (let j = 0; j < 6; j++) {
          const angle = (j / 6) * Math.PI * 2;
          ctx.lineTo(
            x + Math.cos(angle) * size,
            y + Math.sin(angle) * size
          );
        }
        ctx.closePath();
        ctx.stroke();
      }
      break;

    case 'ocean':
      // Океаническая текстура
      const oceanGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      oceanGradient.addColorStop(0, '#1E90FF');
      oceanGradient.addColorStop(0.5, '#4169E1');
      oceanGradient.addColorStop(1, '#000080');
      ctx.fillStyle = oceanGradient;
      ctx.fillRect(0, 0, 512, 512);

      // Добавляем волны
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
        ctx.lineWidth = Math.random() * 2;
        
        const y = Math.random() * 512;
        ctx.moveTo(0, y);
        
        for (let x = 0; x < 512; x += 10) {
          ctx.lineTo(
            x,
            y + Math.sin(x * 0.03) * 10
          );
        }
        ctx.stroke();
      }
      break;

    case 'lava':
      // Улучшенная лавовая текстура с анимированными потоками
      const lavaGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      lavaGradient.addColorStop(0, '#FF4500');
      lavaGradient.addColorStop(0.3, '#FF0000');
      lavaGradient.addColorStop(0.7, '#8B0000');
      lavaGradient.addColorStop(1, '#4A0000');
      ctx.fillStyle = lavaGradient;
      ctx.fillRect(0, 0, 512, 512);

      // Добавляем лавовые потоки
      for (let i = 0; i < 60; i++) {
        const startX = Math.random() * 512;
        const startY = Math.random() * 512;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        let x = startX;
        let y = startY;
        const points = [];
        
        for (let j = 0; j < 5; j++) {
          x += (Math.random() - 0.5) * 100;
          y += Math.random() * 100;
          points.push({ x, y });
        }

        const gradient = ctx.createLinearGradient(startX, startY, x, y);
        gradient.addColorStop(0, 'rgba(255, 200, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(139, 0, 0, 0.4)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.random() * 8 + 2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      }
      break;

    case 'ice':
      // Ледяная текстура
      const iceGradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      iceGradient.addColorStop(0, '#E0FFFF');
      iceGradient.addColorStop(0.5, '#B0E0E6');
      iceGradient.addColorStop(1, '#87CEEB');
      ctx.fillStyle = iceGradient;
      ctx.fillRect(0, 0, 512, 512);

      // Добавляем ледяные трещины
      for (let i = 0; i < 25; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.4})`;
        ctx.lineWidth = Math.random() * 1.5;
        
        const startX = Math.random() * 512;
        const startY = Math.random() * 512;
        ctx.moveTo(startX, startY);
        
        let x = startX;
        let y = startY;
        for (let j = 0; j < 5; j++) {
          x += (Math.random() - 0.5) * 100;
          y += (Math.random() - 0.5) * 100;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      break;

    case 'tech':
      // Технологическая текстура
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 512, 512);

      // Добавляем технологические узоры
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 255, ${Math.random() * 0.5})`;
        ctx.lineWidth = Math.random() * 2;
        
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 50 + 20;
        
        // Создаем технологические схемы
        if (Math.random() > 0.5) {
          ctx.strokeRect(x, y, size, size);
          ctx.strokeRect(x + 5, y + 5, size - 10, size - 10);
        } else {
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.moveTo(x - size, y);
          ctx.lineTo(x + size, y);
          ctx.moveTo(x, y - size);
          ctx.lineTo(x, y + size);
        }
        ctx.stroke();
      }
      break;

    default:
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 512, 512);
  }

  // Создаем карту нормалей
  const normalMap = generateNormalMap(ctx, heightData);

  const textures = {
    texture: new THREE.CanvasTexture(canvas),
    bumpMap: new THREE.CanvasTexture(normalMap)
  };

  textureCache.set(type, textures);
  return textures;
};

export const generateSunTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Создаем градиент для солнца
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, '#FDB813');
  gradient.addColorStop(0.5, '#FDB813');
  gradient.addColorStop(1, '#FF8C00');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Добавляем солнечные пятна
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 160, 0, ${Math.random() * 0.3})`;
    ctx.arc(
      Math.random() * 512,
      Math.random() * 512,
      Math.random() * 50 + 10,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}; 