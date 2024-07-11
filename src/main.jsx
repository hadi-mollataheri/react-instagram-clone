import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Changing dark mode bg color to black
// const styles = {
//   global: (props) => ({
//     'body': {
//       backgroundColor: 
//     }
//   })
// }

// const config = {
//   initialColorMode: 'dark',
//   useSystemColorMode: false,
// };
// const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider >
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
