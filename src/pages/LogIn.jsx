import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogInForm from '../components/LogIn/LogInForm.jsx';
import PICTURES from '../assets/pictures.js';
import {
  handleGoogleLogIn,
  getSession,
  checkSessionExpiration,
} from '../utilities/supabase-apiCalls.js';
import { useUserAuthStoreSelector } from '../stores/userAuth-store.js';

function LogIn() {
  const sessionData = useUserAuthStoreSelector.use.sessionData();
  const updateSessionData = useUserAuthStoreSelector.use.updateSessionData();

  const sessionExpiration = useUserAuthStoreSelector.use.sessionExpiration();
  const updateSessionExpiration =
    useUserAuthStoreSelector.use.updateSessionExpiration();

  const navigate = useNavigate();

  useEffect(() => {
    // *** BUG:This or the next useEffect will run constantly for infinite. why why why
    const fetchAndUpdateSession = async () => {
      const newSessionData = await getSession();
      console.log(
        'newSession from fetchAndUpdateSession on LogIn:',
        newSessionData,
      ); // --- TEST ---
      await updateSessionData(newSessionData);
      console.log('sessionData from google sign in, in LogIn:', sessionData); // --- TEST ---
    };
    fetchAndUpdateSession();
  }, [sessionData]);

  useEffect(() => {
    const fetchAndUpdateSessionExpiration = async () => {
      const isSessionExpired = await checkSessionExpiration();
      console.log(
        'isSessionExpired from fetchAndUpdateSessionExpiration in LogIn:',
        isSessionExpired,
      ); // --- TEST ---
      await updateSessionExpiration(isSessionExpired);
      console.log(
        'sessionExpiration from google sign in, in LogIn:',
        sessionExpiration,
      ); // --- TEST ---
    };
    fetchAndUpdateSessionExpiration();
  }, [sessionExpiration]);

  // Create a handler for Log in with google button click event
  const handleLogInWithGoogleClick = async () => {
    // If session is exist and its time is valid(not expired)
    if (sessionData && sessionExpiration === false) {
      // User is already logged in, redirect to the home page
      window.alert('You are already logged in!');
      navigate('/');
    } else if (!sessionData || sessionExpiration === true) {
      await handleGoogleLogIn();
      alert('Logged in successfully!');
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
            <button
              onClick={handleLogInWithGoogleClick}
              className='text-blue-500'
            >
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
