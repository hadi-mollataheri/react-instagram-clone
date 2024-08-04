import { Link } from 'react-router-dom';
import PICTURES from '../assets/pictures.js';
import SignUpForm from '../components/SignUp/SignUpForm.jsx';

const EmailSignUp = () => {


  return (
    <div id='emailSignUp-container' className='mt-1 min-h-screen scale-90'>
      {/* Logo and Email log in container */}
      <div className='relative -top-[26px] mx-auto flex w-[350px] flex-col justify-start gap-4 border p-5'>
        {/* Instagram logo */}
        <img src={PICTURES.logoColor} className='h-[140px] object-contain' />
        {/* Email sign up form */}
        <SignUpForm />
      </div>
      {/* Log in */}
      <div className='mx-auto my-4 w-[350px] border p-5 text-center'>
        <p>
          Have an account?{' '}
          <Link to='/emailSignUp' className='text-blue-500'>
            Log in
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
  );
};

export default EmailSignUp;
