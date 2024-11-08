import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/index.jsx';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import PageTransition from './components/Transitions/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';

const LoadingScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  color: #00ffff;
  font-size: 1.5rem;
`;

const LoadingText = styled.div`
  color: #00ffff;
  font-size: 1.5rem;
  margin-top: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const LoadingProgress = styled.div`
  width: 200px;
  height: 2px;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    width: 40%;
    height: 100%;
    background: #00ffff;
    animation: loading 1s ease infinite;
    border-radius: 2px;
  }

  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(250%); }
  }
`;

// Используем динамический импорт для Projects
const Projects = React.lazy(() => import('./components/Projects'));

function App() {
  return (
    <ErrorBoundary>
      <GlobalStyles />
      <Router>
        <Navbar />
        <PageTransition>
          <Suspense fallback={
            <LoadingScreen>
              <LoadingText>Initializing Universe</LoadingText>
              <LoadingProgress />
            </LoadingScreen>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={
                <ErrorBoundary>
                  <Projects />
                </ErrorBoundary>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </Router>
    </ErrorBoundary>
  );
}

export default App;