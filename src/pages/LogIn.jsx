import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogInForm from '../components/LogIn/LogInForm.jsx';
import PICTURES from '../assets/pictures.js';
import { handleGoogleLogIn } from '../utilities/supabase-apiCalls.js';
import { useUserAuthStoreSelector } from '../stores/userAuth-store.js';

function LogIn() {
  const sessionData = useUserAuthStoreSelector.use.sessionData();
  const updateSessionData = useUserAuthStoreSelector.use.updateSessionData();

  const navigate = useNavigate();

  useEffect(() => {
    const authTokenKey = 'sb-gylziklaowckktbcufys-auth-token';
    const authToken = localStorage.getItem(authTokenKey);
    if (authToken) updateSessionData(authToken);

    const sessionCheck = () => {
      if (localStorage.getItem(authTokenKey)) {
        localStorage.removeItem('sb-gylziklaowckktbcufys-auth-token'); // Remove the token from local storage
        updateSessionData(null);
        window.alert('Session expired. Please log in again.');
        navigate('/logIn');
      }
    };

    const interval = setInterval(() => {
      sessionCheck();
    }, 3600000);
    return () => clearInterval(interval);
  }, [navigate, sessionData, updateSessionData]);

  const handleGoogleLogInClick = async () => {
    // Check for the session data stored by Supabase
    const authTokenKey = 'sb-gylziklaowckktbcufys-auth-token';
    if (sessionData) {
      window.alert('You are already signed in!');
      return;
    } else {
      try {
        console.log('Attempting Google login...');
        await handleGoogleLogIn();
        const newAuthToken = localStorage.getItem(authTokenKey); // Get the new auth token from local storage
        updateSessionData(newAuthToken);
        // console.log(
        //   'sessionData after updating with google auth token:',
        //   sessionData,
        // );
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    }
  };

  return (
    <div
      id='logIn-container'
      className='relative -top-5 flex min-h-screen items-center justify-center gap-5'
    >
      {/* Instagram sample picture to the left just for big screens */}
      <img
        src={PICTURES.auth}
        alt='instagram sample page'
        className='hidden h-[680px] object-contain sm:block'
      />
      <div id='content-container' className='scale-90'>
        {/* Logo and Email-logIn container */}
        <div className='flex w-[350px] flex-col justify-start gap-4 border p-5'>
          {/* Instagram logo */}
          <img src={PICTURES.logoColor} className='h-[140px] object-contain' />
          {/* Email log in form */}
          <LogInForm />
          <hr className='my-7 overflow-visible bg-slate-400 text-center after:relative after:-top-[13px] after:bg-black after:px-3 after:content-["OR"]' />
          {/* Google log in */}
          <div className='flex items-center justify-center gap-3'>
            <img
              src={PICTURES.google}
              alt='Google logo'
              className='h-[30px] w-[30px]'
            />
            <button onClick={handleGoogleLogInClick} className='text-blue-500'>
              Log in with Google
            </button>
          </div>
        </div>
        {/* Sign up */}
        <div className='my-4 border p-5 text-center'>
          <p>
            Don&apos;t have an account?{' '}
            <Link to='/signUp' className='text-blue-500'>
              Sign up
            </Link>
          </p>
        </div>
        {/* Download app */}
        <p className='pb-4 text-center'>Get the app.</p>
        <div className='flex items-center justify-center gap-1'>
          <img
            src={PICTURES.playStore}
            alt='Google play store'
            className='h-[40px] w-[134px] object-contain'
          />
          <img
            src={PICTURES.microsoft}
            alt='Google play store'
            className='h-[40px] w-[134px] object-contain'
          />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
