import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: #000;
    color: #fff;
    margin: 0;
    padding: 0;
  }

  #root {
    min-height: 100vh;
    width: 100vw;
  }

  /* Стилизуем скроллбар */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.9);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 255, 0.5);
  }

  /* Убираем выделение текста */
  ::selection {
    background: rgba(0, 255, 255, 0.2);
    color: #00ffff;
  }
`;

export default GlobalStyles; 