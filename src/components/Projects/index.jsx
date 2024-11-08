import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SolarSystem from './SolarSystem';

const ProjectsContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Projects = () => {
  return (
    <ProjectsContainer>
      <SolarSystem />
    </ProjectsContainer>
  );
};

export default Projects; 