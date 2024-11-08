import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const IronManContainer = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
`;

const SuitPart = styled(motion.div)`
  position: absolute;
  background: #e62429;
  border: 2px solid #gold;
  filter: drop-shadow(0 0 10px rgba(230, 36, 41, 0.5));
`;

const Helmet = styled(SuitPart)`
  width: 60px;
  height: 70px;
  top: 20px;
  left: 70px;
  border-radius: 30px 30px 20px 20px;
  
  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 15px;
    background: #4A90E2;
    border-radius: 10px;
    top: 25px;
    left: 10px;
    box-shadow: 0 0 10px #4A90E2;
  }
`;

const Chest = styled(SuitPart)`
  width: 100px;
  height: 80px;
  top: 90px;
  left: 50px;
  border-radius: 20px;
  
  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: #4A90E2;
    border-radius: 50%;
    top: 25px;
    left: 35px;
    box-shadow: 0 0 20px #4A90E2;
  }
`;

const LeftArm = styled(SuitPart)`
  width: 30px;
  height: 80px;
  top: 90px;
  left: 10px;
  border-radius: 10px;
`;

const RightArm = styled(SuitPart)`
  width: 30px;
  height: 80px;
  top: 90px;
  right: 10px;
  border-radius: 10px;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 40px;
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: 0%;
  background: #e62429;
  box-shadow: 0 0 10px #e62429;
`;

const LoadingText = styled(motion.div)`
  color: #fff;
  margin-top: 20px;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

function LoadingScreen() {
  const containerRef = useRef();
  const progressRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (containerRef.current && progressRef.current) {
      tl.from('.suit-part', {
        opacity: 0,
        scale: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.2,
      })
      .to(progressRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <LoadingContainer ref={containerRef}>
      <IronManContainer>
        <Helmet className="suit-part" />
        <Chest className="suit-part" />
        <LeftArm className="suit-part" />
        <RightArm className="suit-part" />
      </IronManContainer>

      <ProgressBar>
        <Progress ref={progressRef} />
      </ProgressBar>

      <LoadingText
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        Assembling Suit...
      </LoadingText>
    </LoadingContainer>
  );
}

export default LoadingScreen; 