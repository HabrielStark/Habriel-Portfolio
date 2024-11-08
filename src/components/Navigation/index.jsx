import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform: translateY(${props => props.$hidden ? '-100%' : '0'});
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled(Link)`
  color: #00ffff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffff, transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 255, 0.1);
    border-radius: 4px;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: #00ffff;
    &:before {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  
  &.active {
    color: #00ffff;
    &:before {
      transform: scaleX(1);
      background: rgba(0, 255, 255, 0.2);
    }
  }
  
  &.glow {
    animation: glow 0.5s ease-in-out;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px #00ffff;
    }
    50% {
      box-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff;
    }
    100% {
      box-shadow: 0 0 5px #00ffff;
    }
  }
`;

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navLinksRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <NavContainer $hidden={hidden}>
      <NavContent>
        <Logo to="/">Portfolio</Logo>
        <NavLinks ref={navLinksRef}>
          {navItems.map(item => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;