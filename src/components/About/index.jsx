import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const AboutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
`;

const BackgroundCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  color: #fff;
  overflow-y: auto;
`;

const Section = styled.section`
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: ${props => props.$delay}s;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00ffff, #00ff00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SkillCard = styled.div`
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.1);
  }

  h3 {
    color: #00ffff;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      color: #b0b0b0;
      display: flex;
      align-items: center;

      &:before {
        content: '•';
        color: #00ffff;
        margin-right: 0.5rem;
      }
    }
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  margin: 3rem 0;
  padding-left: 2rem;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #00ffff, transparent);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;

  &:before {
    content: '';
    position: absolute;
    left: -0.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    background: #00ffff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  h3 {
    color: #00ffff;
    margin-bottom: 0.5rem;
  }

  p {
    color: #b0b0b0;
  }

  .date {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const About = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Three.js background setup (similar to Home component)
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Create stars with different colors
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true
    });

    const starVertices = [];
    const starColors = [];
    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);

      // Random star colors (white, blue, cyan)
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.5, Math.random() * 0.2 + 0.8, Math.random() * 0.2 + 0.8);
      starColors.push(color.r, color.g, color.b);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0002;
      stars.rotation.x = (mousePosition.y - window.innerHeight / 2) * 0.00001;
      stars.rotation.y = (mousePosition.x - window.innerWidth / 2) * 0.00001;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <AboutContainer>
      <BackgroundCanvas ref={canvasRef} />
      <Content>
        <Section $delay={0.2}>
          <Title>About Me</Title>
          <Text>
            I am a passionate Full-Stack Developer with a deep love for creating innovative and user-friendly web applications. My journey in technology has been driven by curiosity and a constant desire to learn and evolve.
          </Text>
        </Section>

        <Section $delay={0.4}>
          <Title>Skills & Expertise</Title>
          <SkillsGrid>
            <SkillCard>
              <h3>Frontend Development</h3>
              <ul>
                <li>React.js & Next.js</li>
                <li>TypeScript</li>
                <li>Three.js & WebGL</li>
                <li>CSS3 & Styled Components</li>
              </ul>
            </SkillCard>

            <SkillCard>
              <h3>Backend Development</h3>
              <ul>
                <li>Node.js & Express</li>
                <li>Python & Django</li>
                <li>RESTful APIs</li>
                <li>Database Design</li>
              </ul>
            </SkillCard>

            <SkillCard>
              <h3>Tools & Technologies</h3>
              <ul>
                <li>Git & Version Control</li>
                <li>Docker & Kubernetes</li>
                <li>AWS & Cloud Services</li>
                <li>CI/CD Pipelines</li>
              </ul>
            </SkillCard>
          </SkillsGrid>
        </Section>

        <Section $delay={0.6}>
          <Title>Experience</Title>
          <TimelineContainer>
            <TimelineItem>
              <div className="date">2021 - Present</div>
              <h3>Senior Full-Stack Developer</h3>
              <p>Leading development of enterprise-level web applications and mentoring junior developers.</p>
            </TimelineItem>

            <TimelineItem>
              <div className="date">2019 - 2021</div>
              <h3>Full-Stack Developer</h3>
              <p>Developed and maintained multiple client projects using modern web technologies.</p>
            </TimelineItem>

            <TimelineItem>
              <div className="date">2017 - 2019</div>
              <h3>Frontend Developer</h3>
              <p>Specialized in creating responsive and interactive user interfaces.</p>
            </TimelineItem>
          </TimelineContainer>
        </Section>
      </Content>
    </AboutContainer>
  );
};

export default About; 