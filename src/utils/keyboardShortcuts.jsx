import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            navigate('/');
            break;
          case 'a':
            navigate('/about');
            break;
          case 'p':
            navigate('/projects');
            break;
          case 'c':
            navigate('/contact');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
};
