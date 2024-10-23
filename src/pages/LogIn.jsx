import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogInForm from '../components/LogIn/LogInForm.jsx';
import PICTURES from '../assets/pictures.js';
import {
  handleGoogleLogIn,
  getSession,
} from '../utilities/supabase-apiCalls.js';
import { useUserAuthStoreSelector } from '../stores/userAuth-store.js';

function LogIn() {
  const sessionData = useUserAuthStoreSelector.use.sessionData();
  const updateSessionData = useUserAuthStoreSelector.use.updateSessionData();

  const sessionExpirationTime =
    useUserAuthStoreSelector.use.sessionExpirationTime();
  const updateSessionExpirationTime =
    useUserAuthStoreSelector.use.updateSessionExpirationTime();

  const navigate = useNavigate();

  // Check if the session exist
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      // If there is a session
      if (session) {
        // Update the session state
        updateSessionData(session);
        updateSessionExpirationTime(session.expires_at);
      }
    };
    checkSession();
  }, [updateSessionData, updateSessionExpirationTime]); // *** Caution this dependency might need to be removed ***

  // Check if the session token is expired or not
  useEffect(() => {
    const checkSessionExpiration = async () => {
      // Get the current time
      const currentTime = Date.now();
      if (currentTime > sessionExpirationTime) {
        // Set session state to its initial value(null)
        updateSessionData(null);
      }
    };
    checkSessionExpiration();
  }, [sessionExpirationTime, updateSessionData]); // *** Caution this dependency might need to be removed ***

  // Create handler for the LogIn with Google button and Decide wether user must allowed to log in or redirected to the home page
  const handleGoogleLogInClick = async () => {
    if (sessionData) {
      window.alert('You are already signed in!');
      navigate('/');
    } else {
      // Call the utility
      await handleGoogleLogIn();
      // Update the session
      const session = await getSession();
      updateSessionData(session);
      // Update the session Expiration Time
      const expirationTime = session.expires_at;
      updateSessionExpirationTime(expirationTime);
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
