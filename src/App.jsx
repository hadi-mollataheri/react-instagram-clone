import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LogIn from './pages/LogIn.jsx';
import EmailSignUp from './pages/EmailSignUp.jsx';
function App() {
  return (
    <Router basename='/react-instagram-clone'>
      <div className='text-white'>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='/' element={<LogIn />} />
          <Route path='signUp' element={<EmailSignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
