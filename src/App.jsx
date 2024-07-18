import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Authentication from './pages/Authentication.jsx';

function App() {
  return (
    <Router basename='/react-instagram-clone'>
      <div className='text-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='auth' element={<Authentication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
