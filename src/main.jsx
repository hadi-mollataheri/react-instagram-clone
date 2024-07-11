import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// Changing dark mode bg color to black
const styles = {
  global: (props) => ({
    body: {
      bg: mode('white', 'black')(props),
      color: mode('black', 'white')(props),
    },
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
// extendTheme will merge it argument into theme object
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
