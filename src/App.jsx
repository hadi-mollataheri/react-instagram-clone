import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Authentication from './pages/Authentication.jsx';
import EmailSignUp from './pages/EmailSignUp.jsx';
function App() {
  return (
    <Router basename='/react-instagram-clone'>
      <div className='text-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='emailSignUp' element={<EmailSignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
