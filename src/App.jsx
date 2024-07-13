import { Button } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

function App() {
  return (
    <>
      <p className='m-2 bg-green-500 p-1 font-semibold text-purple-800 shadow-xl'>
        Click on the Vite and React logos to learn more
      </p>
      <FaHome className='text-blue-500' />
      <Button colorScheme={'green'} ml={5}>
        Button
      </Button>
    </>
  );
}

export default App;
