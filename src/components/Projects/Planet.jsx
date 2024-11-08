import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Planet = ({ project, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { planetProps, color, orbit } = project;
  
  // Создаем базовую текстуру для планеты
  const { texture, bumpMap } = useMemo(() => {
    const canvas = document.createElement('canvas');
    const bumpCanvas = document.createElement('canvas');
    canvas.width = bumpCanvas.width = 1024;
    canvas.height = bumpCanvas.height = 1024;
    const ctx = canvas.getContext('2d');
    const bumpCtx = bumpCanvas.getContext('2d');

    switch (planetProps.textureType) {
      case 'tech':
        // Технологическая планета
        const techGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
        techGradient.addColorStop(0, '#001133');
        techGradient.addColorStop(0.5, '#000066');
        techGradient.addColorStop(1, '#000033');
        ctx.fillStyle = techGradient;
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем микросхемы и цепи
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 100 + 50;

          // Создаем микросхему
          ctx.strokeStyle = `rgba(0, 255, 255, ${Math.random() * 0.3 + 0.2})`;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, size, size);

          // Добавляем внутренние компоненты
          for (let j = 0; j < 5; j++) {
            const innerX = x + Math.random() * size;
            const innerY = y + Math.random() * size;
            const innerSize = Math.random() * 20 + 10;

            ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.4 + 0.1})`;
            ctx.fillRect(innerX, innerY, innerSize, innerSize);
          }

          // Добавляем соединительные линии
          ctx.beginPath();
          ctx.moveTo(x + size / 2, y + size);
          ctx.lineTo(x + size / 2, y + size + Math.random() * 100);
          ctx.stroke();
        }

        // Добавляем светящиеся точки
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 4 + 2;

          const glow = ctx.createRadialGradient(x, y, 0, x, y, size);
          glow.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
          glow.addColorStop(0.5, 'rgba(0, 255, 255, 0.3)');
          glow.addColorStop(1, 'rgba(0, 255, 255, 0)');

          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Добавляем эффект глубины
        for (let layer = 0; layer < 3; layer++) {
          const depth = 1 - layer * 0.3;
          ctx.fillStyle = `rgba(0, ${20 + layer * 20}, ${50 + layer * 30}, ${depth})`;
          ctx.fillRect(0, 0, 1024, 1024);
        }

        // Добавляем сложные схемы
        for (let i = 0; i < 30; i++) {
          const startX = Math.random() * 1024;
          const startY = Math.random() * 1024;
          
          // Создаем сложные микросхемы
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          let currentX = startX;
          let currentY = startY;
          
          for (let j = 0; j < 5; j++) {
            const nextX = currentX + (Math.random() - 0.5) * 200;
            const nextY = currentY + (Math.random() - 0.5) * 200;
            
            // Добавляем изгибы в линиях
            const controlX = (currentX + nextX) / 2 + (Math.random() - 0.5) * 50;
            const controlY = (currentY + nextY) / 2 + (Math.random() - 0.5) * 50;
            
            ctx.quadraticCurveTo(controlX, controlY, nextX, nextY);
            currentX = nextX;
            currentY = nextY;
          }
          
          // Создаем светящийся эффект
          const gradient = ctx.createLinearGradient(startX, startY, currentX, currentY);
          gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
          gradient.addColorStop(0.5, 'rgba(0, 150, 255, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 50, 255, 0.3)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = Math.random() * 3 + 1;
          ctx.stroke();
        }

        // Добавляем голографические элементы
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 30 + 10;
          
          const holoGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          holoGradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
          holoGradient.addColorStop(0.5, 'rgba(0, 150, 255, 0.2)');
          holoGradient.addColorStop(1, 'rgba(0, 50, 255, 0)');
          
          ctx.fillStyle = holoGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'crystal':
        // Кристаллическая планета
        const crystalBaseGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
        crystalBaseGradient.addColorStop(0, '#FF69B4');
        crystalBaseGradient.addColorStop(0.3, '#DA70D6');
        crystalBaseGradient.addColorStop(0.7, '#9370DB');
        crystalBaseGradient.addColorStop(1, '#4B0082');
        ctx.fillStyle = crystalBaseGradient;
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем кристаллические структуры
        for (let i = 0; i < 40; i++) {
          const centerX = Math.random() * 1024;
          const centerY = Math.random() * 1024;
          const size = Math.random() * 150 + 50;

          // Создаем многослойный кристалл
          for (let j = 0; j < 3; j++) {
            const layerSize = size * (1 - j * 0.2);
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - layerSize);

            for (let k = 0; k < 6; k++) {
              const angle = (k / 6) * Math.PI * 2;
              const x = centerX + Math.cos(angle) * layerSize;
              const y = centerY + Math.sin(angle) * layerSize;
              ctx.lineTo(x, y);
            }

            ctx.closePath();
            const gradient = ctx.createRadialGradient(
              centerX, centerY, 0,
              centerX, centerY, layerSize
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.1 + j * 0.1})`);
            gradient.addColorStop(1, 'rgba(147, 112, 219, 0.1)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + j * 0.1})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }

        // Создаем базовый градиент с большей глубиной
        const crystalDepthGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
        crystalDepthGradient.addColorStop(0, '#FF69B4');
        crystalDepthGradient.addColorStop(0.2, '#DA70D6');
        crystalDepthGradient.addColorStop(0.4, '#9370DB');
        crystalDepthGradient.addColorStop(0.6, '#8A2BE2');
        crystalDepthGradient.addColorStop(0.8, '#4B0082');
        crystalDepthGradient.addColorStop(1, '#2E0854');
        ctx.fillStyle = crystalDepthGradient;
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем кристаллические грани с отражениями
        for (let i = 0; i < 50; i++) {
          const centerX = Math.random() * 1024;
          const centerY = Math.random() * 1024;
          const size = Math.random() * 200 + 100;
          const rotation = Math.random() * Math.PI * 2;

          // Создаем многослойный кристалл
          for (let j = 0; j < 5; j++) {
            const layerSize = size * (1 - j * 0.15);
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation + j * 0.1);

            // Создаем грани кристалла
            ctx.beginPath();
            for (let k = 0; k < 8; k++) {
              const angle = (k / 8) * Math.PI * 2;
              const jitter = Math.random() * 10;
              const x = Math.cos(angle) * (layerSize + jitter);
              const y = Math.sin(angle) * (layerSize + jitter);
              if (k === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();

            // Добавляем градиент для каждой грани
            const faceGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerSize);
            faceGradient.addColorStop(0, `rgba(255, 255, 255, ${0.1 + j * 0.05})`);
            faceGradient.addColorStop(0.5, `rgba(255, 200, 255, ${0.05 + j * 0.03})`);
            faceGradient.addColorStop(1, 'rgba(147, 112, 219, 0.1)');

            ctx.fillStyle = faceGradient;
            ctx.fill();

            // Добавляем блики
            if (Math.random() > 0.7) {
              const highlight = ctx.createLinearGradient(
                -layerSize, -layerSize,
                layerSize, layerSize
              );
              highlight.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
              highlight.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
              highlight.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
              ctx.fillStyle = highlight;
              ctx.fill();
            }

            ctx.restore();
          }
        }
        break;

      case 'plasma':
        // Плазменная планета
        const plasmaGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
        plasmaGradient.addColorStop(0, '#FF1493');  // Яркий розовый в центре
        plasmaGradient.addColorStop(0.3, '#FF00FF'); // Магента
        plasmaGradient.addColorStop(0.7, '#9400D3'); // Темно-фиолетовый
        plasmaGradient.addColorStop(1, '#4B0082');   // Индиго
        ctx.fillStyle = plasmaGradient;
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем динамические плазменные потоки
        for (let i = 0; i < 20; i++) {
          const startX = Math.random() * 1024;
          const startY = Math.random() * 1024;
          
          // Создаем извилистые плазменные потоки
          for (let j = 0; j < 5; j++) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            
            let x = startX;
            let y = startY;
            
            // Создаем сложный путь для потока
            for (let k = 0; k < 10; k++) {
              const controlX1 = x + Math.random() * 100 - 50;
              const controlY1 = y + Math.random() * 100;
              const controlX2 = x + Math.random() * 100 - 50;
              const controlY2 = y + Math.random() * 100;
              x += Math.random() * 50 - 25;
              y += Math.random() * 100;
              
              ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, x, y);
            }
            
            // Создаем градиент для потока
            const plasmaGradient = ctx.createLinearGradient(startX, startY, x, y);
            const hue1 = Math.random() * 60 + 280;
            const hue2 = hue1 + Math.random() * 30 - 15;
            
            plasmaGradient.addColorStop(0, `hsla(${hue1}, 100%, 70%, 0.8)`);
            plasmaGradient.addColorStop(0.5, `hsla(${hue2}, 100%, 60%, 0.5)`);
            plasmaGradient.addColorStop(1, `hsla(${hue1}, 100%, 70%, 0.8)`);
            
            ctx.strokeStyle = plasmaGradient;
            ctx.lineWidth = Math.random() * 10 + 5;
            ctx.stroke();
          }
        }

        // Добавляем плазменные вихри
        for (let i = 0; i < 15; i++) {
          const centerX = Math.random() * 1024;
          const centerY = Math.random() * 1024;
          const size = Math.random() * 200 + 100;
          
          for (let j = 0; j < 20; j++) {
            const angle = (j / 20) * Math.PI * 8;
            const radius = size * (1 - j / 20);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const vortexGradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
            vortexGradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
            vortexGradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.4)');
            vortexGradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
            
            ctx.fillStyle = vortexGradient;
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'quantum':
        // Квантовая планета
        ctx.fillStyle = '#000033';
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем квантовое поле
        for (let i = 0; i < 50; i++) {
          const centerX = Math.random() * 1024;
          const centerY = Math.random() * 1024;
          const radius = Math.random() * 200 + 100;
          const baseHue = Math.random() * 60 + 180; // голубой спектр

          // Создаем квантовые волны
          for (let j = 0; j < 10; j++) {
            const waveRadius = radius * (1 - j/10);
            const opacity = (1 - j/10) * 0.3;

            ctx.strokeStyle = `hsla(${baseHue}, 100%, 50%, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Добавляем квантовые частицы
          for (let j = 0; j < 50; j++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            const particleSize = Math.random() * 4 + 2;

            const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, particleSize * 2);
            particleGradient.addColorStop(0, `hsla(${baseHue}, 100%, 70%, 0.8)`);
            particleGradient.addColorStop(0.5, `hsla(${baseHue}, 100%, 50%, 0.4)`);
            particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = particleGradient;
            ctx.beginPath();
            ctx.arc(x, y, particleSize * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Добавляем квантовые флуктуации
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 30 + 10;
          
          const fluctuation = ctx.createRadialGradient(x, y, 0, x, y, size);
          fluctuation.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
          fluctuation.addColorStop(0.3, 'rgba(0, 255, 255, 0.4)');
          fluctuation.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = fluctuation;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Добавляем квантовую запутанность
        for (let i = 0; i < 30; i++) {
          const x1 = Math.random() * 1024;
          const y1 = Math.random() * 1024;
          const x2 = Math.random() * 1024;
          const y2 = Math.random() * 1024;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          
          // Создаем волнистую линию запутанности
          const points = 10;
          for (let j = 0; j <= points; j++) {
            const t = j / points;
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;
            const offset = Math.sin(t * Math.PI * 4) * 20;
            
            ctx.lineTo(x + offset, y + offset);
          }
          
          const entanglementGradient = ctx.createLinearGradient(x1, y1, x2, y2);
          entanglementGradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
          entanglementGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.2)');
          entanglementGradient.addColorStop(1, 'rgba(0, 255, 255, 0.8)');
          
          ctx.strokeStyle = entanglementGradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        break;

      case 'nebula':
        // Создаем глубокий космический фон
        const nebulaBaseGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
        nebulaBaseGradient.addColorStop(0, '#4B0082');  // Индиго в центре
        nebulaBaseGradient.addColorStop(0.3, '#800080'); // Пурпурный
        nebulaBaseGradient.addColorStop(0.6, '#483D8B'); // Темно-синий
        nebulaBaseGradient.addColorStop(1, '#191970');   // Полуночно-синий
        ctx.fillStyle = nebulaBaseGradient;
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем множественные слои туманности
        for (let layer = 0; layer < 5; layer++) {
          const layerOpacity = 0.3 - layer * 0.05;
          
          // Создаем облака туманности
          for (let i = 0; i < 10; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 1024;
            const size = Math.random() * 300 + 200;
            
            const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            const hue = Math.random() * 60 + 260; // Диапазон от фиолетового до розового
            
            cloudGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${layerOpacity})`);
            cloudGradient.addColorStop(0.4, `hsla(${hue + 20}, 100%, 60%, ${layerOpacity * 0.7})`);
            cloudGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = cloudGradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Добавляем звездные скопления
        for (let i = 0; i < 1000; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 2 + 1;
          const brightness = Math.random() * 0.5 + 0.5;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Добавляем энергетические потоки
        for (let i = 0; i < 20; i++) {
          const points = [];
          let x = Math.random() * 1024;
          let y = 0;
          
          while (y < 1024) {
            points.push({ x, y });
            x += (Math.random() - 0.5) * 100;
            y += Math.random() * 50 + 25;
          }
          
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let j = 1; j < points.length; j++) {
            const xc = (points[j].x + points[j - 1].x) / 2;
            const yc = (points[j].y + points[j - 1].y) / 2;
            ctx.quadraticCurveTo(points[j - 1].x, points[j - 1].y, xc, yc);
          }
          
          const streamGradient = ctx.createLinearGradient(0, 0, 0, 1024);
          const hue = Math.random() * 60 + 260;
          streamGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.1)`);
          streamGradient.addColorStop(0.5, `hsla(${hue}, 100%, 70%, 0.3)`);
          streamGradient.addColorStop(1, `hsla(${hue}, 100%, 70%, 0.1)`);
          
          ctx.strokeStyle = streamGradient;
          ctx.lineWidth = Math.random() * 3 + 1;
          ctx.stroke();
        }
        break;

      case 'toxic':
        // Создаем базовый токсичный градиент
        const toxicBaseGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
        toxicBaseGradient.addColorStop(0, '#39FF14');   // Яркий неоновый зеленый
        toxicBaseGradient.addColorStop(0.3, '#32CD32');  // Лайм
        toxicBaseGradient.addColorStop(0.6, '#228B22');  // Лесной зеленый
        toxicBaseGradient.addColorStop(1, '#006400');    // Темно-зеленый
        ctx.fillStyle = toxicBaseGradient;
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем токсичные облака
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 200 + 100;
          
          const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          cloudGradient.addColorStop(0, 'rgba(173, 255, 47, 0.4)');
          cloudGradient.addColorStop(0.5, 'rgba(127, 255, 0, 0.2)');
          cloudGradient.addColorStop(1, 'rgba(0, 100, 0, 0)');
          
          ctx.fillStyle = cloudGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Добавляем токсичные реки
        for (let i = 0; i < 10; i++) {
          const points = [];
          let x = Math.random() * 1024;
          let y = 0;
          
          while (y < 1024) {
            points.push({ x, y });
            x += (Math.random() - 0.5) * 100;
            y += Math.random() * 50 + 25;
          }
          
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let j = 1; j < points.length; j++) {
            const xc = (points[j].x + points[j - 1].x) / 2;
            const yc = (points[j].y + points[j - 1].y) / 2;
            ctx.quadraticCurveTo(points[j - 1].x, points[j - 1].y, xc, yc);
          }
          
          const riverGradient = ctx.createLinearGradient(0, 0, 0, 1024);
          riverGradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
          riverGradient.addColorStop(0.5, 'rgba(173, 255, 47, 0.6)');
          riverGradient.addColorStop(1, 'rgba(0, 100, 0, 0.4)');
          
          ctx.strokeStyle = riverGradient;
          ctx.lineWidth = Math.random() * 10 + 5;
          ctx.stroke();
        }

        // Добавляем пузырьки
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 5 + 2;
          
          const bubbleGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          bubbleGradient.addColorStop(0, 'rgba(144, 238, 144, 0.8)');
          bubbleGradient.addColorStop(0.5, 'rgba(144, 238, 144, 0.4)');
          bubbleGradient.addColorStop(1, 'rgba(144, 238, 144, 0)');
          
          ctx.fillStyle = bubbleGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'holographic':
        // Создаем темный фон
        ctx.fillStyle = '#000022';
        ctx.fillRect(0, 0, 1024, 1024);

        // Добавляем голографическую сетку
        for (let i = 0; i < 32; i++) {
          for (let j = 0; j < 32; j++) {
            const x = (i / 32) * 1024;
            const y = (j / 32) * 1024;
            const size = 1024 / 32;
            
            // Создаем эффект мерцания
            const opacity = 0.1 + Math.sin(i * j) * 0.05;
            
            const gridGradient = ctx.createLinearGradient(x, y, x + size, y + size);
            gridGradient.addColorStop(0, `rgba(0, 238, 255, ${opacity})`);
            gridGradient.addColorStop(0.5, `rgba(0, 238, 255, ${opacity * 2})`);
            gridGradient.addColorStop(1, `rgba(0, 238, 255, ${opacity})`);
            
            ctx.strokeStyle = gridGradient;
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, size, size);
          }
        }

        // Добавляем голографические символы
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 20 + 10;
          const opacity = Math.random() * 0.5 + 0.3;
          
          ctx.font = `${size}px monospace`;
          ctx.fillStyle = `rgba(0, 238, 255, ${opacity})`;
          ctx.fillText(
            String.fromCharCode(0x2800 + Math.floor(Math.random() * 256)),
            x,
            y
          );
        }

        // Добавляем голографические круги
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * 1024;
          const y = Math.random() * 1024;
          const size = Math.random() * 100 + 50;
          
          const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          circleGradient.addColorStop(0, 'rgba(0, 238, 255, 0.4)');
          circleGradient.addColorStop(0.5, 'rgba(0, 238, 255, 0.2)');
          circleGradient.addColorStop(1, 'rgba(0, 238, 255, 0)');
          
          ctx.fillStyle = circleGradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Добавляем голографические линии
        for (let i = 0; i < 50; i++) {
          const startX = Math.random() * 1024;
          const startY = Math.random() * 1024;
          const endX = startX + (Math.random() - 0.5) * 200;
          const endY = startY + (Math.random() - 0.5) * 200;
          
          const lineGradient = ctx.createLinearGradient(startX, startY, endX, endY);
          lineGradient.addColorStop(0, 'rgba(0, 238, 255, 0)');
          lineGradient.addColorStop(0.5, 'rgba(0, 238, 255, 0.4)');
          lineGradient.addColorStop(1, 'rgba(0, 238, 255, 0)');
          
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = Math.random() * 2 + 1;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
        break;

      default:
        // Базовая текстура по умолчанию
        ctx.fillStyle = planetProps.textureType || '#ffffff';
        ctx.fillRect(0, 0, 1024, 1024);
    }

    // Создаем карту нормалей
    for (let y = 0; y < 1024; y++) {
      for (let x = 0; x < 1024; x++) {
        const noise = Math.random() * 0.3;
        bumpCtx.fillStyle = `rgb(${noise * 255},${noise * 255},${noise * 255})`;
        bumpCtx.fillRect(x, y, 1, 1);
      }
    }

    return {
      texture: new THREE.CanvasTexture(canvas),
      bumpMap: new THREE.CanvasTexture(bumpCanvas)
    };
  }, [planetProps.textureType]);

  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 
          1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
      // Орбитальное движение
      const angle = Date.now() * 0.001 * orbit.speed + orbit.initialAngle;
      meshRef.current.position.x = Math.cos(angle) * orbit.radius;
      meshRef.current.position.z = Math.sin(angle) * orbit.radius;
      
      // Вращение планеты
      meshRef.current.rotation.y += 0.01;
    }
  });

  // В компоненте Planet добавляем кольца
  const PlanetRings = ({ rings, size }) => {
    const geometry = useMemo(() => {
      const innerRadius = rings.innerRadius * size;
      const outerRadius = rings.outerRadius * size;
      const thetaSegments = 64;

      const geometry = new THREE.RingGeometry(
        innerRadius,
        outerRadius,
        thetaSegments
      );

      // Поворачиваем кольца, чтобы они были горизонтальными
      const positionAttribute = geometry.attributes.position;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        vertex.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      return geometry;
    }, [rings, size]);

    return (
      <mesh rotation={[0, 0, 0.3]}>
        <primitive object={geometry} />
        <meshPhongMaterial
          color={rings.color}
          transparent
          opacity={rings.opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
          e.object.scale.multiplyScalar(1.1);
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'default';
          e.object.scale.multiplyScalar(1/1.1);
        }}
      >
        <sphereGeometry args={[planetProps.size, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          bumpMap={bumpMap}
          bumpScale={0.05}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      
      {/* Атмосфера */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[planetProps.size, 32, 32]} />
        <meshPhongMaterial
          color={planetProps.atmosphereColor || '#ffffff'}
          transparent={true}
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Кольца */}
      {planetProps.rings && (
        <PlanetRings rings={planetProps.rings} size={planetProps.size} />
      )}
    </group>
  );
};

export default Planet;