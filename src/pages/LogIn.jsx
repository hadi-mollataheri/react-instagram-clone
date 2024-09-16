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

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      // Cant i just use the logic of handling session expiration for both the 1- stopping
      // the user from repetitive log in or sing in and 2- logging the user out when session
      // expires?
      // Also there is no use for useEffect because its just get the session even the user
      // is not trying to sing in. or not because this useful as part of the logic for
      // handling session expiration and i want to update this logic so that includes the
      // handling session expiration and then when each component is mounted the existing of
      // session and its expiration will be checked so this way user can't sign up or log in
      // if he already is and also when session expiration time is reached he will be logged out
      // and then he can log in again
      // but later i want to handle when user date is already in data base he can't sign up again
      const sessionData = await getSession();
      if (sessionData) {
        // User is already logged in, redirect to the home page
        navigate('/');
      }
    };
    checkSession();
  }, [navigate]);

  // Create a handler for Log in with google button click event
  const handleLogInWithGoogleClick = async () => {
    await handleGoogleLogIn();
    alert('Logged in successfully!');
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
